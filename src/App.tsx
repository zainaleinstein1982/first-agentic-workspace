export default function App() {
  const [channels, setChannels] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [rightTab, setRightTab] = useState<'agents' | 'brain'>('agents');
  const [isExecutingPromptQL, setIsExecutingPromptQL] = useState(false);

  // State dinamis untuk data SBLC (diinisialisasi dengan sblcDataDummy)
  const [blocksData, setBlocksData] = useState<any[]>(sblcDataDummy);

  // Load Initial Channels & Agents
  useEffect(() => {
    async function loadData() {
      const { data: channelsData } = await supabase.from('channels').select('*').order('created_at', { ascending: true });
      if (channelsData && channelsData.length > 0) setChannels(channelsData);

      const { data: agentsData } = await supabase.from('agents').select('*');
      if (agentsData && agentsData.length > 0) setAgents(agentsData);
    }
    loadData();
  }, []);

  // Fetch Messages saat activeChannel berubah
  useEffect(() => {
    async function fetchMessages() {
      if (!activeChannel) return;
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('channel_id', activeChannel.id)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    }
    fetchMessages();
  }, [activeChannel]);

  // Eksekusi Simulasi PromptQL Strategis
  const handleRunPromptQL = () => {
    if (!activeChannel) return;
    setIsExecutingPromptQL(true);

    setTimeout(() => {
      const userMsg = {
        id: Date.now().toString(),
        channel_id: activeChannel.id,
        sender_type: 'user',
        sender_name: 'Jane Doe',
        content: `RUN PROMPTQL: Jalankan analisis risiko SBLC & strategi mitigasi keterlambatan sekuens blok.`,
        created_at: new Date().toISOString()
      };

      const agentResponseText = promptQLSimulations[activeChannel.name] || promptQLSimulations.general;

      const agentMsg = {
        id: (Date.now() + 1).toString(),
        channel_id: activeChannel.id,
        sender_type: 'agent',
        sender_name: 'PromptQL Orchestrator (Iris & Raffasya)',
        content: agentResponseText,
        created_at: new Date().toISOString()
      };

      setMessages((prev) => [...prev, userMsg, agentMsg]);
      setIsExecutingPromptQL(false);
    }, 1200);
  };

  // KIRIM PESAN & DETEKSI OTOMATIS AGENT
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChannel) return;

    const userText = newMessage.trim();

    const userObj = {
      id: Date.now().toString(),
      channel_id: activeChannel.id,
      sender_type: 'user',
      sender_name: 'Jane Doe',
      content: userText,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userObj]);
    setNewMessage('');

    // AKSI 1: Jika mengetik "+ Input Data Blok" di channel #engineering
    if (activeChannel.name === 'engineering' && userText.toLowerCase().includes('+ input data blok')) {
      setTimeout(() => {
        const botTemplate = {
          id: (Date.now() + 1).toString(),
          channel_id: activeChannel.id,
          sender_type: 'agent',
          sender_name: 'Raffasya (Process Agent)',
          content: `Silakan salin templat di bawah ini, sesuaikan nilainya, lalu kirimkan kembali ke chat:\n\n` +
            `blockId: 'Blok 6B (Sub-Assembly)',\n` +
            `plannedProgress: 80,\n` +
            `actualProgress: 60,\n` +
            `delayDays: 8,\n` +
            `riskLevel: 'High',\n` +
            `kriIndicator: 'Keterlambatan Supply Material Plate',\n` +
            `costImpactUSD: 18000`,
          created_at: new Date().toISOString()
        };
        setMessages((prev) => [...prev, botTemplate]);
      }, 600);
      return;
    }

    // AKSI 2: Jika user mengirimkan pesan format input data blok (mengandung blockId & kriIndicator)
    if (userText.includes('blockId:') && userText.includes('kriIndicator:')) {
      try {
        // Parsing data secara otomatis dari text string pengguna
        const blockIdMatch = userText.match(/blockId:\s*['"]([^'"]+)['"]/);
        const plannedMatch = userText.match(/plannedProgress:\s*(\d+)/);
        const actualMatch = userText.match(/actualProgress:\s*(\d+)/);
        const delayMatch = userText.match(/delayDays:\s*(\d+)/);
        const riskMatch = userText.match(/riskLevel:\s*['"]([^'"]+)['"]/);
        const kriMatch = userText.match(/kriIndicator:\s*['"]([^'"]+)['"]/);
        const costMatch = userText.match(/costImpactUSD:\s*(\d+)/);

        if (blockIdMatch && kriMatch) {
          const newBlockObj = {
            blockId: blockIdMatch[1],
            plannedProgress: plannedMatch ? Number(plannedMatch[1]) : 0,
            actualProgress: actualMatch ? Number(actualMatch[1]) : 0,
            delayDays: delayMatch ? Number(delayMatch[1]) : 0,
            riskLevel: riskMatch ? riskMatch[1] : 'Medium',
            kriIndicator: kriMatch[1],
            costImpactUSD: costMatch ? Number(costMatch[1]) : 0,
          };

          // Tambahkan ke tabel SBLC Real-Time Data Stream
          setBlocksData((prev) => [...prev, newBlockObj]);

          setTimeout(() => {
            const botConfirm = {
              id: (Date.now() + 1).toString(),
              channel_id: activeChannel.id,
              sender_type: 'agent',
              sender_name: 'Iris (Data Agent)',
              content: `✅ Data **${newBlockObj.blockId}** berhasil ditambahkan ke dalam SBLC Risk Stream dan kalkulasi Critical Path!`,
              created_at: new Date().toISOString()
            };
            setMessages((prev) => [...prev, botConfirm]);
          }, 800);
          return;
        }
      } catch (err) {
        console.error("Gagal parsing input blok", err);
      }
    }

    // Respons Default AI
    setTimeout(() => {
      const aiReply = {
        id: (Date.now() + 1).toString(),
        channel_id: activeChannel.id,
        sender_type: 'agent',
        sender_name: 'Atlas (Knowledge Agent)',
        content: `Pesan diterima. Data diproses melalui pipeline PromptQL pada workspace #${activeChannel.name}.`,
        created_at: new Date().toISOString()
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  // Jangan lupa pada JSX bagian Rendering Tabel SBLC, ubah dari sblcDataDummy.map menjadi blocksData.map:
  // {blocksData.map((item) => ( ... ))}
