let challenges = [
  {
    id: 1,
    type: 'text',
    content: '本当にもうすぐ終わるの？',
    correctAnswer: 'ほんとうにもうすぐおわるの？',
    author: 'Tanaka',
    category: 'text',
    level: 'N5',
    successRate: 85,
    dateAdded: '2024-01-15',
  },
  {
    id: 2,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400',
    correctAnswer: 'さくら',
    author: 'Yuki',
    category: 'picture',
    level: 'N4',
    successRate: 62,
    dateAdded: '2024-01-14',
  },
  {
    id: 3,
    type: 'audio',
    content: null,
    correctAnswer: 'おはようございます',
    author: 'Sato',
    category: 'audio',
    level: 'N5',
    successRate: 78,
    dateAdded: '2024-01-13',
  },
  {
    id: 4,
    type: 'text',
    content: '猫が好きです',
    correctAnswer: 'ねこがすきです',
    author: 'Kobayashi',
    category: 'anime',
    level: 'N5',
    successRate: 91,
    dateAdded: '2024-01-12',
  },
  {
    id: 5,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1528360983277-13d9012356ee?w=400',
    correctAnswer: 'ぎおん',
    author: 'Yamamoto',
    category: 'manga',
    level: 'N3',
    successRate: 45,
    dateAdded: '2024-01-11',
  },
  {
    id: 6,
    type: 'video',
    content: null,
    correctAnswer: 'たのしい',
    author: 'Nakamura',
    category: 'video',
    level: 'N4',
    successRate: 55,
    dateAdded: '2024-01-10',
  },
  {
    id: 7,
    type: 'text',
    content: '日本語を勉強しています',
    correctAnswer: 'にほんごをべんきょうしています',
    author: 'Suzuki',
    category: 'text',
    level: 'N4',
    successRate: 73,
    dateAdded: '2024-01-09',
  },
  {
    id: 8,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400',
    correctAnswer: 'とうきょう',
    author: 'Ito',
    category: 'picture',
    level: 'N5',
    successRate: 88,
    dateAdded: '2024-01-08',
  },
  {
    id: 9,
    type: 'text',
    content: '俺らで倒すんだってばよ',
    correctAnswer: 'おれらでたおすんだってばよ',
    author: 'Ito',
    category: 'anime',
    level: 'N5',
    successRate: 88,
    dateAdded: '2024-01-08',
  }
];

export function getChallenges() {
  return [...challenges].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
}

export function getChallengeById(id) {
  return challenges.find(c => c.id === parseInt(id, 10));
}

export function addChallenge(challenge) {
  const newChallenge = {
    ...challenge,
    id: Date.now(),
    author: 'Current User',
    successRate: 0,
    dateAdded: new Date().toISOString().split('T')[0],
  };
  challenges = [newChallenge, ...challenges];
  return newChallenge;
}
