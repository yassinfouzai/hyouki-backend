import { useState } from 'react';
import { useNavigate } from 'react-router';

// Basic Hiragana (Gojūon)
const HIRAGANA_BASIC = [
  { id: 'a', name: 'A', characters: ['あ', 'い', 'う', 'え', 'お'], romaji: ['a', 'i', 'u', 'e', 'o'] },
  { id: 'ka', name: 'KA', characters: ['か', 'き', 'く', 'け', 'こ'], romaji: ['ka', 'ki', 'ku', 'ke', 'ko'] },
  { id: 'sa', name: 'SA', characters: ['さ', 'し', 'す', 'せ', 'そ'], romaji: ['sa', 'shi', 'su', 'se', 'so'] },
  { id: 'ta', name: 'TA', characters: ['た', 'ち', 'つ', 'て', 'と'], romaji: ['ta', 'chi', 'tsu', 'te', 'to'] },
  { id: 'na', name: 'NA', characters: ['な', 'に', 'ぬ', 'ね', 'の'], romaji: ['na', 'ni', 'nu', 'ne', 'no'] },
  { id: 'ha', name: 'HA', characters: ['は', 'ひ', 'ふ', 'へ', 'ほ'], romaji: ['ha', 'hi', 'fu', 'he', 'ho'] },
  { id: 'ma', name: 'MA', characters: ['ま', 'み', 'む', 'め', 'も'], romaji: ['ma', 'mi', 'mu', 'me', 'mo'] },
  { id: 'ya', name: 'YA', characters: ['や', null, 'ゆ', null, 'よ'], romaji: ['ya', null, 'yu', null, 'yo'] },
  { id: 'ra', name: 'RA', characters: ['ら', 'り', 'る', 'れ', 'ろ'], romaji: ['ra', 'ri', 'ru', 're', 'ro'] },
  { id: 'wa', name: 'WA', characters: ['わ', null, null, null, 'を'], romaji: ['wa', null, null, null, 'wo'] },
  { id: 'n', name: 'N', characters: ['ん'], romaji: ['n'] },
];

// Dakuten Hiragana
const HIRAGANA_DAKUTEN = [
  { id: 'ga', name: 'GA', characters: ['が', 'ぎ', 'ぐ', 'げ', 'ご'], romaji: ['ga', 'gi', 'gu', 'ge', 'go'] },
  { id: 'za', name: 'ZA', characters: ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'], romaji: ['za', 'ji', 'zu', 'ze', 'zo'] },
  { id: 'da', name: 'DA', characters: ['だ', 'ぢ', 'づ', 'で', 'ど'], romaji: ['da', 'ji', 'zu', 'de', 'do'] },
  { id: 'ba', name: 'BA', characters: ['ば', 'び', 'ぶ', 'べ', 'ぼ'], romaji: ['ba', 'bi', 'bu', 'be', 'bo'] },
  { id: 'pa', name: 'PA', characters: ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'], romaji: ['pa', 'pi', 'pu', 'pe', 'po'] },
];

// Combined Hiragana (Yōon)
const HIRAGANA_COMBINED = [
  { id: 'kya', name: 'KYA', characters: ['きゃ', 'きゅ', 'きょ'], romaji: ['kya', 'kyu', 'kyo'] },
  { id: 'sha', name: 'SHA', characters: ['しゃ', 'しゅ', 'しょ'], romaji: ['sha', 'shu', 'sho'] },
  { id: 'cha', name: 'CHA', characters: ['ちゃ', 'ちゅ', 'ちょ'], romaji: ['cha', 'chu', 'cho'] },
  { id: 'nya', name: 'NYA', characters: ['にゃ', 'にゅ', 'にょ'], romaji: ['nya', 'nyu', 'nyo'] },
  { id: 'hya', name: 'HYA', characters: ['ひゃ', 'ひゅ', 'ひょ'], romaji: ['hya', 'hyu', 'hyo'] },
  { id: 'mya', name: 'MYA', characters: ['みゃ', 'みゅ', 'みょ'], romaji: ['mya', 'myu', 'myo'] },
  { id: 'rya', name: 'RYA', characters: ['りゃ', 'りゅ', 'りょ'], romaji: ['rya', 'ryu', 'ryo'] },
  { id: 'gya', name: 'GYA', characters: ['ぎゃ', 'ぎゅ', 'ぎょ'], romaji: ['gya', 'gyu', 'gyo'] },
  { id: 'ja', name: 'JA', characters: ['じゃ', 'じゅ', 'じょ'], romaji: ['ja', 'ju', 'jo'] },
  { id: 'bya', name: 'BYA', characters: ['びゃ', 'びゅ', 'びょ'], romaji: ['bya', 'byu', 'byo'] },
  { id: 'pya', name: 'PYA', characters: ['ぴゃ', 'ぴゅ', 'ぴょ'], romaji: ['pya', 'pyu', 'pyo'] },
];

// Basic Katakana
const KATAKANA_BASIC = [
  { id: 'ka-a', name: 'A', characters: ['ア', 'イ', 'ウ', 'エ', 'オ'], romaji: ['a', 'i', 'u', 'e', 'o'] },
  { id: 'ka-ka', name: 'KA', characters: ['カ', 'キ', 'ク', 'ケ', 'コ'], romaji: ['ka', 'ki', 'ku', 'ke', 'ko'] },
  { id: 'ka-sa', name: 'SA', characters: ['サ', 'シ', 'ス', 'セ', 'ソ'], romaji: ['sa', 'shi', 'su', 'se', 'so'] },
  { id: 'ka-ta', name: 'TA', characters: ['タ', 'チ', 'ツ', 'テ', 'ト'], romaji: ['ta', 'chi', 'tsu', 'te', 'to'] },
  { id: 'ka-na', name: 'NA', characters: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'], romaji: ['na', 'ni', 'nu', 'ne', 'no'] },
  { id: 'ka-ha', name: 'HA', characters: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'], romaji: ['ha', 'hi', 'fu', 'he', 'ho'] },
  { id: 'ka-ma', name: 'MA', characters: ['マ', 'ミ', 'ム', 'メ', 'モ'], romaji: ['ma', 'mi', 'mu', 'me', 'mo'] },
  { id: 'ka-ya', name: 'YA', characters: ['ヤ', null, 'ユ', null, 'ヨ'], romaji: ['ya', null, 'yu', null, 'yo'] },
  { id: 'ka-ra', name: 'RA', characters: ['ラ', 'リ', 'ル', 'レ', 'ロ'], romaji: ['ra', 'ri', 'ru', 're', 'ro'] },
  { id: 'ka-wa', name: 'WA', characters: ['ワ', null, null, null, 'ヲ'], romaji: ['wa', null, null, null, 'wo'] },
  { id: 'ka-n', name: 'N', characters: ['ン'], romaji: ['n'] },
];

// Dakuten Katakana
const KATAKANA_DAKUTEN = [
  { id: 'ka-ga', name: 'GA', characters: ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'], romaji: ['ga', 'gi', 'gu', 'ge', 'go'] },
  { id: 'ka-za', name: 'ZA', characters: ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'], romaji: ['za', 'ji', 'zu', 'ze', 'zo'] },
  { id: 'ka-da', name: 'DA', characters: ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'], romaji: ['da', 'ji', 'zu', 'de', 'do'] },
  { id: 'ka-ba', name: 'BA', characters: ['バ', 'ビ', 'ブ', 'ベ', 'ボ'], romaji: ['ba', 'bi', 'bu', 'be', 'bo'] },
  { id: 'ka-pa', name: 'PA', characters: ['パ', 'ピ', 'プ', 'ペ', 'ポ'], romaji: ['pa', 'pi', 'pu', 'pe', 'po'] },
];

// Combined Katakana (Yōon)
const KATAKANA_COMBINED = [
  { id: 'ka-kya', name: 'KYA', characters: ['キャ', 'キュ', 'キョ'], romaji: ['kya', 'kyu', 'kyo'] },
  { id: 'ka-sha', name: 'SHA', characters: ['シャ', 'シュ', 'ショ'], romaji: ['sha', 'shu', 'sho'] },
  { id: 'ka-cha', name: 'CHA', characters: ['チャ', 'チュ', 'チョ'], romaji: ['cha', 'chu', 'cho'] },
  { id: 'ka-nya', name: 'NYA', characters: ['ニャ', 'ニュ', 'ニョ'], romaji: ['nya', 'nyu', 'nyo'] },
  { id: 'ka-hya', name: 'HYA', characters: ['ヒャ', 'ヒュ', 'ヒョ'], romaji: ['hya', 'hyu', 'hyo'] },
  { id: 'ka-mya', name: 'MYA', characters: ['ミャ', 'ミュ', 'ミョ'], romaji: ['mya', 'myu', 'myo'] },
  { id: 'ka-rya', name: 'RYA', characters: ['リャ', 'リュ', 'リョ'], romaji: ['rya', 'ryu', 'ryo'] },
  { id: 'ka-gya', name: 'GYA', characters: ['ギャ', 'ギュ', 'ギョ'], romaji: ['gya', 'gyu', 'gyo'] },
  { id: 'ka-ja', name: 'JA', characters: ['ジャ', 'ジュ', 'ジョ'], romaji: ['ja', 'ju', 'jo'] },
  { id: 'ka-bya', name: 'BYA', characters: ['ビャ', 'ビュ', 'ビョ'], romaji: ['bya', 'byu', 'byo'] },
  { id: 'ka-pya', name: 'PYA', characters: ['ピャ', 'ピュ', 'ピョ'], romaji: ['pya', 'pyu', 'pyo'] },
];

const ALL_HIRAGANA = [...HIRAGANA_BASIC, ...HIRAGANA_DAKUTEN, ...HIRAGANA_COMBINED];
const ALL_KATAKANA = [...KATAKANA_BASIC, ...KATAKANA_DAKUTEN, ...KATAKANA_COMBINED];

export default function Learn() {
  const [activeTab, setActiveTab] = useState('hiragana');
  const [selectedColumns, setSelectedColumns] = useState([]);
  const navigate = useNavigate();

  const getCurrentData = () => {
    return activeTab === 'hiragana' ? ALL_HIRAGANA : ALL_KATAKANA;
  };

  const toggleColumn = (columnId) => {
    setSelectedColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  const selectAll = () => {
    setSelectedColumns(getCurrentData().map((col) => col.id));
  };

  const deselectAll = () => {
    setSelectedColumns([]);
  };

  const handleStartPractice = () => {
    if (selectedColumns.length === 0) return;
    
    const currentData = getCurrentData();
    const practiceData = [];
    currentData.forEach((col) => {
      if (selectedColumns.includes(col.id)) {
        col.characters.forEach((char, index) => {
          if (char) {
            practiceData.push({
              character: char,
              reading: col.romaji[index],
              column: col.id,
            });
          }
        });
      }
    });

    const practiceRoute = activeTab === 'hiragana' ? '/practice/hiragana' : '/practice/katakana';
    navigate(practiceRoute, { state: { practiceData } });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedColumns([]);
  };

  const totalSelectedCharacters = selectedColumns.reduce((count, colId) => {
    const col = getCurrentData().find((c) => c.id === colId);
    return count + (col ? col.characters.filter(Boolean).length : 0);
  }, 0);

  const currentData = getCurrentData();
  const scriptName = activeTab === 'hiragana' ? 'Hiragana' : 'Katakana';

  return (
    <div className="learn-container">
      <div className="sections-nav">
        <div 
          className={`section-tab ${activeTab === 'hiragana' ? 'active' : ''}`}
          onClick={() => handleTabChange('hiragana')}
        >
          Hiragana
        </div>
        <div 
          className={`section-tab ${activeTab === 'katakana' ? 'active' : ''}`}
          onClick={() => handleTabChange('katakana')}
        >
          Katakana
        </div>
        <div className="section-tab disabled">Kanji (coming soon)</div>
      </div>

      <div className="learn-header">
        <h1 className="learn-title">Learn {scriptName}</h1>
        <p className="learn-subtitle">
          Select the columns you want to practice. Click on a card to select/deselect.
        </p>
      </div>

      <div className="learn-controls">
        <button className="btn btn-secondary" onClick={selectAll}>
          Select All
        </button>
        <button className="btn btn-secondary" onClick={deselectAll}>
          Deselect All
        </button>
        <span className="selection-count">
          {selectedColumns.length} columns selected ({totalSelectedCharacters} characters)
        </span>
      </div>

      <div className="columns-grid">
        {currentData.map((column) => (
          <div
            key={column.id}
            className={`column-card ${selectedColumns.includes(column.id) ? 'selected' : ''}`}
            onClick={() => toggleColumn(column.id)}
          >
            <h3 className="column-name">{column.name}</h3>
            <div className={`column-characters ${column.characters.length <= 3 ? 'combined' : ''}`}>
              {column.characters.map((char, index) => (
                <div key={index} className="character-cell">
                  {char ? (
                    <>
                      <span className="hiragana-char">{char}</span>
                      <span className="romaji-text">{column.romaji[index]}</span>
                    </>
                  ) : (
                    <span className="empty-cell">-</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="learn-actions">
        <button
          className="btn btn-primary btn-large"
          onClick={handleStartPractice}
          disabled={selectedColumns.length === 0}
        >
          Start Practice ({totalSelectedCharacters} characters)
        </button>
      </div>

    </div>
  );
}
