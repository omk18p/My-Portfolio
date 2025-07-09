import "./ArticleFacts.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Swipeable from "/src/components/capabilities/Swipeable.jsx"
import {useConstants} from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import { motion } from 'framer-motion'

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleFacts({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-facts`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleFactsItems dataWrapper={dataWrapper} 
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
function ArticleFactsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <Swipeable className={`article-facts-items`}
                   slidesPerView={4}
                   loop={true}
                   breakpoints={constants.SWIPER_BREAKPOINTS_FOR_FOUR_SLIDES}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleFactsItem itemWrapper={itemWrapper} 
                                      key={key}/>
            ))}
        </Swipeable>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleFactsItem({ itemWrapper }) {
    return (
        <motion.div
            className={`article-facts-item`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.025, boxShadow: '0 2px 16px #C084FC66' }}
            transition={{ type: 'spring', stiffness: 140, damping: 18, duration: 0.22 }}
        >
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIcon}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-facts-item-avatar`}/>

            <div className={`article-facts-item-info`}>
                <h6 className={`article-facts-item-info-title lead`}
                    dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                <div className={`article-facts-item-info-description text-3 mt-1`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            </div>
        </motion.div>
    )
}

export default ArticleFacts
