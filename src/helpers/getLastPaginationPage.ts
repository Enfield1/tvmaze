export default function getLastPaginationPage(linksFromRequestHeader: string): number {
  const links: string[] = linksFromRequestHeader.split(',');

  try {
    const last = links.find(link => link.includes('rel="last"'));
    const match = last.match(/page=(\w*?)&/);
    return Number(match[1]);
  } catch (error) {
    console.error(error);
    return 0;
  }
}
