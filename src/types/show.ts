export interface Show {
  externals: {
    imdb: string;     // "tt1553656"
    thetvdb: number;  // 264492
    tvrage: number;   // 25988
  };
  genres: string[];   // ["Drama", "Science-Fiction", "Thriller"]
  id: number;         // 1
  image: {
    medium: string;   // "http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"
    original: string; // "http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
  };
  language: string;   // "English"
  name: string;       // "Under the Dome"
  network: {
    country: {
      code: string;     // "US"
      name: string;     // "United States"
      timezone: string; // "America/New_York"
    };
    id: number;         // 2
    name: string;       // "CBS"
  };
  officialSite: string; // "http://www.cbs.com/shows/under-the-dome/"
  premiered: string;    // "2013/06/24"
  rating: {
    average: number;    // 6.5
  };
  runtime: number;      // 60
  schedule: {
    days: string[];     // ["Thursday"]
    time: string;       // "22:00"
  };
  status: string;       // "Ended"
  summary: string;      // "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>"
  type: string;         // "Scripted"
  updated: number;      // 1573667713
  url: string;          // "http://www.tvmaze.com/shows/1/under-the-dome"
  webChannel: unknown;
  weight: number;       // 88
  _links: {
    previousepisode: {
      href: string;     // "http://api.tvmaze.com/episodes/185054"
    };
    self: {
      href: string;     // "http://api.tvmaze.com/shows/1"
    };
  };
}
