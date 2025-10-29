export const createMockMovie = (userId: string) => {
    return {
        user: userId,
        watchmodeId: 1404362,
        title: "The Lord of the Rings: The Fellowship of the Ring",
        summary: "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
        runtime: 179,
        year: 2001,
        rating: "PG-13",
        imdbRating: 8.7,
        genres: [
            "Adventure",
            "Fantasy",
            "Action"
        ],
        posterURL: "https://cdn.watchmode.com/posters/01404362_poster_w342.jpg",
        director: [
            "Peter Jackson"
        ],
        cast: [
            "Elijah Wood",
            "Ian McKellen",
            "Viggo Mortensen",
            "Sean Astin",
            "Ian Holm",
            "Liv Tyler",
            "Christopher Lee",
            "Sean Bean",
            "Billy Boyd",
            "Dominic Monaghan"
        ],
        streamingOn: [
            "MAX",
            "HBO (Via Hulu)",
            "YouTube",
            "VUDU",
            "Spectrum On Demand",
            "Amazon",
            "AppleTV",
            "Plex"
        ]
    };

};