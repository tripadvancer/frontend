import { Metadata } from 'next';
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Discovering Warsaw: Must-See Places in Poland\'s Capital',
    description: 'Dive into the vibrant city of Warsaw with our guide to the top 10 must-see places. From the historic charm of the Old Town to the cultural richness of Royal Łazienki Park, uncover the best of what this captivating capital has to offer.',
    keywords: 'Warsaw, Poland, top 10 places, Old Town, Royal Łazienki Park, Warsaw Uprising Museum, Royal Castle, Palace of Culture and Science, Copernicus Science Centre, Wilanów Palace, POLIN Museum, Nowy Świat Street, travel, tourism, attractions',
}

export default function ArticleLayout({ children }: { children: ReactNode; }) {
    return children
}
