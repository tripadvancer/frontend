import { FeedArticlesItem } from './feed-articles-item'

export const FeedArticles = ({ theme }: { theme: string }) => {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <FeedArticlesItem theme={theme} />
            <FeedArticlesItem theme={theme} />
            <FeedArticlesItem theme={theme} />
            <FeedArticlesItem theme={theme} />
        </div>
    )
}
