const fs = require('fs');
const path = require('path');

/**
 * Node script to generate a reading report for a specific year.
 * Usage: node generate-report.js 2025
 */

const targetYear = process.argv[2];

if (!targetYear) {
  console.error('Please provide a year: node generate-report.js <year>');
  process.exit(1);
}

// File path relative to the execution root
const BOOKS_FILE = path.join(__dirname, '..', 'public', 'books', '_books.json');

// Manual mapping for the diversity section
const authorGenders = {
  'Asako Yuzuki': 'Women',
  'Karen Hao': 'Women',
  'C.J. Skuse': 'Women',
  'Nina Stibbe': 'Women',
  'Ursula K. Le Guin': 'Women',
  'Sarah Gailey': 'Women',
  'Ash Sarkar': 'Women',
  'Cara Hunter': 'Women',
  'Paula Hawkins': 'Women',
  'Natalie Haynes': 'Women',
  'Lauren Beukes': 'Women',
  'Susanna Clarke': 'Women',
  'Becky Chambers': 'Women',
  'Martha Wells': 'Women',
  'Emily Henry': 'Women',
  'Gabrielle Zevin': 'Women',
  'Emilia Hart': 'Women',
  'R.F. Kuang': 'Women',
  'Emily St. John Mandel': 'Women',
  'Margaret Atwood': 'Women',
  'Sue Townsend': 'Women',
  'Carrie Fisher': 'Women',
  'Agatha Christie': 'Women',
  'Sylvia Plath': 'Women',
  'Winifred Watson': 'Women',
  'Isla Fisher': 'Women',
  'Joanna Kavenna': 'Women',
  'Hannah M. Lynn': 'Women',
  'Annalee Newitz': 'Women',
  'Charlie Jane Anders': 'Women',
  'Kit de Waal': 'Women',
  'Naomi Alderman': 'Women',
  'Claire North': 'Women',
  'Nnedi Okorafor': 'Women',
  'Claire L Evans': 'Women',

  'Bob Mortimer': 'Men',
  'Matt Haig': 'Men',
  'H.G. Wells': 'Men',
  'Richard Osman': 'Men',
  'Spike Milligan': 'Men',
  'John Grisham': 'Men',
  'Fredrik Backman': 'Men',
  'John Scalzi': 'Men',
  'Frank Herbert': 'Men',
  'Philip K. Dick': 'Men',
  'Seichō Matsumoto': 'Men',
  'Mike Chen': 'Men',
  'Jasper Fforde': 'Men',
  'William Gibson': 'Men',
  'Brian Jacques': 'Men',
  'Arthur C. Clarke': 'Men',
  'Patrick Rothfuss': 'Men',
  'Douglas Adams': 'Men',
  'Alexander McCall Smith': 'Men',
  'Jack London': 'Men',
  'Liu Cixin': 'Men',
  'Cixin Liu': 'Men',
  'Dan Whitehead': 'Men',
  'Adrian Tchaikovsky': 'Men',
  'Ernest Cline': 'Men',
  'A.F. Harrold': 'Men',
  'Blake Crouch': 'Men',
  'Ted Chiang': 'Men',
  'Yevgeny Zamyatin': 'Men',
  'Mikhail Bulgakov': 'Men',
  'Greg Wise': 'Men',
  'Andrew Kaufman': 'Men',
  'Luke Smitherd': 'Men',
  'Neil Gaiman': 'Men',
  'Gaiman, Neil': 'Men',
  'William Tang': 'Men',
  'Robert Galbraith': 'Men',
  'Antoine de Saint-Exupéry': 'Men',
  'George Orwell': 'Men',
  'J.D. Salinger': 'Men',
  'Keith A. Pearson': 'Men',
  'Keith A slice': 'Men',
  'Keith Stuart': 'Men',
  'Robert Rankin': 'Men',
  'Robert Webb': 'Men',
  'John Wyndham': 'Men',
  'Matthew Johnstone': 'Men',
  'Brian K. Vaughan': 'Men',
  'Alan Partridge': 'Men',
  'Jonas Jonasson': 'Men',
  'John Steinbeck': 'Men',
  'Charles Dickens': 'Men',
  'Jomny Sun': 'Men',
  'Mitch Albom': 'Men',
  'Aldous Huxley': 'Men',
  'William Golding': 'Men',
  'Ray Bradbury': 'Men',
};

// Helper: Calculate days between start and read dates
/**
 * Calculates days between dates inclusively.
 * (e.g., 16-June to 18-June is 3 days: 16, 17, 18)
 */
function getDurationInDays(startStr, readStr) {
  if (!startStr || startStr === '?' || !readStr) return null;
  const start = new Date(Array.isArray(startStr) ? startStr[0] : startStr);
  const end = new Date(Array.isArray(readStr) ? readStr[0] : readStr);

  if (isNaN(start) || isNaN(end)) return null;

  // Set times to midnight to ensure we only count full calendar days
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffTime = end - start;
  // Use Math.abs and +1 for inclusive day counting
  return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
}
// Helper: Formats days into "X months, Y days"
function formatDuration(days) {
  if (days < 1) return 'Less than a day';
  if (days < 30) return `${days} days`;
  const months = Math.floor(days / 30);
  const remainingDays = days % 30;
  let parts = [];
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  if (remainingDays > 0)
    parts.push(`${remainingDays} day${remainingDays > 1 ? 's' : ''}`);
  return parts.join(', ');
}

try {
  const data = JSON.parse(fs.readFileSync(BOOKS_FILE, 'utf8'));

  // Filter books read in the target year
  const books = data.filter((book) => {
    const readDate = Array.isArray(book.read) ? book.read[0] : book.read;
    return readDate && readDate.startsWith(targetYear);
  });

  if (books.length === 0) {
    console.log(`No books found for year ${targetYear}.`);
    process.exit(0);
  }

  // Identify extremes by page count
  const sortedByPages = [...books].sort((a, b) => a.pages - b.pages);
  const shortest = sortedByPages[0];
  const longest = sortedByPages[sortedByPages.length - 1];

  // Calculate read durations
  const booksWithTimes = books
    .map((b) => ({
      ...b,
      days: getDurationInDays(b.start, b.read),
    }))
    .filter((b) => b.days !== null && b.days >= 0);

  const quickest = [...booksWithTimes].sort((a, b) => a.days - b.days)[0];
  // Define a slog as taking 45+ days
  const slogs = booksWithTimes.sort((a, b) => b.days - a.days).slice(0, 1);

  // Groups
  const diversity = books.reduce((acc, b) => {
    const gender = authorGenders[b.author] || 'Other';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const rated = books.reduce((acc, b) => {
    acc[b.rating] = acc[b.rating] || [];
    acc[b.rating].push(b);
    return acc;
  }, {});

  const decades = books.reduce((acc, b) => {
    const decade = Math.floor(b.published / 10) * 10;
    acc[decade] = acc[decade] || [];
    acc[decade].push(b);
    return acc;
  }, {});

  // Template Generation
  let md = `**Longest book**: [${longest.title}](/books/${targetYear}/${longest.slug}) - ${longest.pages} pages\n\n`;
  md += `**Shortest book**: [${shortest.title}](/books/${targetYear}/${shortest.slug}) - ${shortest.pages} pages\n\n`;

  if (quickest) {
    md += `**Quickest read**: ${quickest.days} days - [${quickest.title}](/books/${targetYear}/${quickest.slug}) *by ${quickest.author}* (${quickest.pages} pages)\n\n`;
  }

  if (slogs.length > 0) {
    md += `**Longest read**: `;
    slogs.forEach((s) => {
      md += `${formatDuration(s.days)} - [${s.title}](/books/${targetYear}/${
        s.slug
      }) *by ${s.author}* (${s.pages} pages)\n`;
    });
    md += `\n`;
  }

  md += `**Diversity of authors**:\n\n`;
  if (diversity.Women) md += `* Women: ${diversity.Women}\n`;
  if (diversity.Men) md += `* Men: ${diversity.Men}\n`;
  if (diversity.Other) md += `* Other/Unknown: ${diversity.Other}\n`;

  md += `\n## Rated books\n`;
  [5, 4].forEach((r) => {
    if (rated[r]) {
      md += `\n### ${r} stars\n\n`;
      rated[r].forEach((b) => {
        md += `* [${b.title}](/books/${targetYear}/${b.slug}) - ${b.pages} pages\n`;
      });
    }
  });

  md += `\n## Books by decade\n`;
  Object.keys(decades)
    .sort()
    .forEach((dec) => {
      md += `\n**${dec}**\n`;
      decades[dec]
        .sort((a, b) => a.published - b.published)
        .forEach((b) => {
          md += `- ${b.published}: [${b.title}](/books/${targetYear}/${b.slug}) *by ${b.author}*\n`;
        });
    });

  console.log(md);
} catch (err) {
  console.error('Critical error:', err.message);
}
