import "./ArticleTimeline.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import {ArticleItemInfoForTimelines, ArticleItemInfoForTimelinesHeader, ArticleItemInfoForTimelinesTagsFooter, ArticleItemInfoForTimelinesBody} from "/src/components/articles/partials/ArticleItemInfoForTimelines.jsx"
import { motion } from 'framer-motion'

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimeline({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-timeline`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTimelineItems dataWrapper={dataWrapper}
                                  selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <ul className={`article-timeline-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleTimelineItem itemWrapper={itemWrapper} 
                                     key={key}/>
            ))}

            <ArticleTimelineTrailingItem itemWrapper={null}/>
        </ul>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineItem({ itemWrapper }) {
    return (
        <li className={`article-timeline-item`}>
            <AvatarView src={itemWrapper?.img}
                        faIcon={itemWrapper?.faIcon}
                        style={itemWrapper?.faIconStyle}
                        alt={itemWrapper?.imageAlt}
                        className={`article-timeline-item-avatar`}/>

            <motion.div
                className={`article-timeline-item-content`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.025, boxShadow: '0 2px 16px #C084FC66' }}
                transition={{ type: 'spring', stiffness: 140, damping: 18, duration: 0.22 }}
            >
                <ArticleItemInfoForTimelines className={``}>
                    <ArticleItemInfoForTimelinesHeader itemWrapper={itemWrapper}
                                                       dateInterval={true}/>

                    <ArticleItemInfoForTimelinesBody itemWrapper={itemWrapper}/>

                    <ArticleItemInfoForTimelinesTagsFooter itemWrapper={itemWrapper}/>
                </ArticleItemInfoForTimelines>
            </motion.div>
        </li>
    )
}

/**
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineTrailingItem() {
    return (
        <li className={`article-timeline-item article-timeline-item-trailing`}>
            <AvatarView className={`article-timeline-item-avatar`}/>
        </li>
    )
}

export default ArticleTimeline
