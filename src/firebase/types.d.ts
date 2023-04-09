declare global {
    namespace app {
        type Podcast = {
            podcastID: string;
            name: string;
            ownerID: string;
            subscribes: number;
            episodesID: string[];
        }

        type Episode = {
            episodeID: string;
            title: string;
            description: string;
            view: number;
            topic: string;
            // build this from the uuids
            // url: string;
            authorID: string;
        }
    }
}

export { };
