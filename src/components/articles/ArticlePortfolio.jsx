import "./ArticlePortfolio.scss"
import React, {useEffect, useState} from 'react'
import Article from "/src/components/articles/base/Article.jsx"
import Transitionable from "/src/components/capabilities/Transitionable.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useConstants} from "/src/hooks/constants.js"
import AvatarView from "/src/components/generic/AvatarView.jsx"
import {Tag, Tags} from "/src/components/generic/Tags.jsx"
import ArticleItemPreviewMenu from "/src/components/articles/partials/ArticleItemPreviewMenu.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import { motion } from 'framer-motion'
import {ModalWrapper, ModalWrapperTitle, ModalWrapperBody} from "/src/components/modals/base/ModalWrapper"
import GalleryModal from "/src/components/modals/GalleryModal.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolio({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const [modalProject, setModalProject] = useState(null)
    const [showGallery, setShowGallery] = useState(false)
    const [galleryImages, setGalleryImages] = useState([])

    return (
        <>
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-portfolio`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticlePortfolioItems dataWrapper={dataWrapper}
                                   selectedItemCategoryId={selectedItemCategoryId}
                                   onProjectClick={setModalProject}/>
        </Article>
        {modalProject && (
            <ModalWrapper id={`project-details-modal-${modalProject.id || ''}`} onDismiss={() => setModalProject(null)}>
                <ModalWrapperTitle title={modalProject.locales.title} faIcon="fa-solid fa-folder-open" onClose={() => setModalProject(null)} />
                <ModalWrapperBody>
                    <div style={{marginBottom: 16}}>
                        <Tags>
                            {modalProject.locales.tags && modalProject.locales.tags.map((tag, i) => (
                                <Tag key={i} text={tag} variant={Tag.Variants.DARK}/>
                            ))}
                        </Tags>
                    </div>
                    <div className="text-2" dangerouslySetInnerHTML={{__html: modalProject.locales.text}}/>
                    <div style={{marginTop: 24, marginBottom: 8}}>
                        <hr/>
                        <div className="fw-bold mb-2">More about this project:</div>
                        <div className="text-2" style={{whiteSpace: 'pre-line'}}>
                            {modalProject.locales.moreInfo ? modalProject.locales.moreInfo : 'No additional information.'}
                        </div>
                    </div>
                    {modalProject.preview?.screenshots?.length > 0 && (
                        <div style={{marginTop: 24, marginBottom: 16}}>
                            <button className="btn btn-primary" onClick={() => { setGalleryImages(modalProject.preview.screenshots); setShowGallery(true); }}>View Screenshots</button>
                        </div>
                    )}
                    <div style={{marginTop: 16}}>
                        <ArticleItemPreviewMenu itemWrapper={modalProject} spaceBetween={true}/>
                    </div>
                </ModalWrapperBody>
            </ModalWrapper>
        )}
        {showGallery && (
            <GalleryModal target={{ images: galleryImages, title: modalProject?.locales?.title }} onDismiss={() => setShowGallery(false)} />
        )}
        </>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItems({ dataWrapper, selectedItemCategoryId, onProjectClick }) {
    const constants = useConstants()
    const language = useLanguage()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)

    const itemsPerRow = customBreakpoint?.slidesPerView || 1
    const itemsPerRowClass = `article-portfolio-items-${itemsPerRow}-per-row`

    const refreshFlag = dataWrapper.categories?.length ?
        selectedItemCategoryId + "-" + language.getSelectedLanguage()?.id :
        language.getSelectedLanguage()?.id

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={100}
                            animation={Transitionable.Animations.POP}
                            className={`article-portfolio-items ${itemsPerRowClass}`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticlePortfolioItem itemWrapper={itemWrapper}
                                          key={key}
                                          onClick={() => onProjectClick(itemWrapper)}/>
                ))}
            </Transitionable>
        )
    }
    else {
        return (
            <div className={`article-portfolio-items ${itemsPerRowClass} mb-3 mb-lg-2`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticlePortfolioItem itemWrapper={itemWrapper}
                                          key={key}
                                          onClick={() => onProjectClick(itemWrapper)}/>
                ))}
            </div>
        )
    }
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItem({ itemWrapper, onClick }) {
    return (
        <motion.div 
            className={`article-portfolio-item`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.025, boxShadow: '0 2px 16px #C084FC66' }}
            transition={{ type: 'spring', stiffness: 140, damping: 18, duration: 0.22 }}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIcon}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-portfolio-item-avatar`}/>

            <ArticlePortfolioItemTitle itemWrapper={itemWrapper}/>
            <ArticlePortfolioItemBody itemWrapper={itemWrapper}/>
            <ArticlePortfolioItemFooter itemWrapper={itemWrapper}/>
        </motion.div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItemTitle({ itemWrapper }) {
    return (
        <div className={`article-portfolio-item-title`}>
            <h5 className={`article-portfolio-item-title-main`}
                dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

            <div className={`article-portfolio-item-title-category text-2`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.category?.label }}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItemBody({ itemWrapper }) {
    return (
        <div className={`article-portfolio-item-body`}>
            <Tags className={`article-portfolio-item-body-tags`}>
                {itemWrapper.locales.tags && Boolean(itemWrapper.locales.tags.length) && itemWrapper.locales.tags.map((tag, key) => (
                    <Tag key={key}
                         text={tag}
                         variant={Tag.Variants.DARK}
                         className={`article-portfolio-item-body-tag text-1`}/>
                ))}
            </Tags>

            <div className={`article-portfolio-item-body-description text-2`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItemFooter({ itemWrapper }) {
    const hasPreview = itemWrapper.preview
    const hasPreviewLinks = itemWrapper.preview?.hasLinks
    const hasScreenshotsOrVideo = itemWrapper.preview?.hasScreenshotsOrYoutubeVideo

    const previewMenuAvailable = hasPreview && (hasPreviewLinks || hasScreenshotsOrVideo)
    if(!previewMenuAvailable)
        return <></>

    return (
        <div className={`article-portfolio-item-footer`}>
            <ArticleItemPreviewMenu itemWrapper={itemWrapper}
                                    spaceBetween={true}
                                    className={`article-portfolio-item-footer-menu`}/>
        </div>
    )
}

export default ArticlePortfolio