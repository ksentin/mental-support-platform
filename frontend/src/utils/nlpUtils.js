// utils/nlpUtils.js

const stopwords = new Set([
  'я', 'ти', 'він', 'вона', 'воно', 'ми', 'ви', 'вони',
  'та', 'і', 'й', 'але', 'а', 'чи', 'що', 'не', 'це', 'у', 'в', 'на', 'до', 'із', 'з', 'по',
  'за', 'від', 'для', 'про', 'як', 'ще', 'ж', 'то', 'так', 'ну', 'таки', 'було', 'є', 'був', 'була',
]);

function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?():;"«»—\-]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopwords.has(word));
}

export function getTopKeywords(entries, monthIndex) {
  const counts = {};

  entries.forEach(entry => {
    const entryDate = new Date(entry.date);
    if (entryDate.getMonth() !== monthIndex) return;

    const textFields = [entry.comment, entry.good_things, entry.bad_things];
    textFields.forEach(field => {
      const words = cleanText(field || '');
      words.forEach(word => {
        counts[word] = (counts[word] || 0) + 1;
      });
    });
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return sorted;
}