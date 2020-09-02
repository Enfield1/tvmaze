import { ShowsState } from "../reducers/showsReducer";

export function getCorrectPagination(linksFromRequestHeader: string): Partial<ShowsState['pagination']> {
  if (linksFromRequestHeader === '') return {};

  const links: string[] = linksFromRequestHeader.split(',');
  const pagination: Partial<ShowsState['pagination']> = {};

  try {
    links.forEach((link: string) => {
      switch (true) {
        case link.includes('rel="last"'): {
          const match = link.match(/page=(\w*?)&/)
          pagination.last = Number(match[1]);
          break;
        }
        case link.includes('rel="first"'): {
          const match = link.match(/page=(\w*?)&/)
          pagination.first = Number(match[1]);
          break;
        }
        case link.includes('rel="prev"'): {
          const match = link.match(/page=(\w*?)&/)
          pagination.current = Number(match[1]) + 1;
          break;
        }
      }
    });
  } catch (error) {
    console.error(error);
  }

  if (typeof pagination.current === 'undefined') {
    pagination.current = pagination.first;
  }

  return pagination;
}
