import "./ArticleText.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import { useData } from "/src/providers/DataProvider.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleText({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const data = useData();
    const profile = data.getProfile();
    const resumeUrl = profile.resumePdfUrl;

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-text`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTextItems dataWrapper={dataWrapper}
                              selectedItemCategoryId={selectedItemCategoryId}/>
            {resumeUrl && (
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                  <a
                    href={resumeUrl}
                    download="Omkar-Patil-Resume.pdf"
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Resume
                  </a>
                </div>
            )}
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <div className={`article-text-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleTextItem itemWrapper={itemWrapper} 
                                      key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItem({ itemWrapper }) {
    const positioningClass = itemWrapper.id % 2 === 0 ?
        `article-text-item-reverse` :
        ``

    return (
        <div className={`article-text-item ${positioningClass}`}>
            <div className={`article-text-avatar-view-wrapper`}>
                <AvatarView className={`article-text-avatar-view`}
                            src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}/>
            </div>

            <div className={`article-text-excerpt last-p-no-margin text-3`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || itemWrapper.placeholder}}/>
        </div>
    )
}

export default ArticleText
