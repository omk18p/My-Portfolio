import "./ModalWrapper.scss"
import React, {useEffect, useState} from 'react'
import Modal from 'bootstrap/js/src/modal'
import CircularButton from "/src/components/buttons/CircularButton.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"
import {useViewport} from "/src/providers/ViewportProvider.jsx"
import {useUtils} from "/src/hooks/utils.js"

function ModalWrapper({ children, id = "", shouldDismiss, onDismiss, className = "", dialogClassName = "" }) {
    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);
    // Pure React modal: no Bootstrap JS
    // Close on backdrop click or close button
    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal')) {
            onDismiss && onDismiss();
        }
    };
    return (
        <div id={id}
             className={`modal show d-block modal-fade-animate ${className}`}
             tabIndex="-1"
             style={{ background: 'rgba(0,0,0,0.7)' }}
             onClick={handleBackdropClick}>
            <div className={`modal-dialog ${dialogClassName}`} style={{ pointerEvents: 'auto', transition: 'transform 0.3s cubic-bezier(.25,.8,.25,1), opacity 0.3s cubic-bezier(.25,.8,.25,1)', transform: 'scale(1)', opacity: 1 }}>
                <div className={`modal-content`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function ModalWrapperTitle({ title, faIcon, onClose, tooltip }) {
    const language = useLanguage()

    return (
        <div className={`modal-header`}>
            <h4 className={`modal-title fw-bold`}>
                <i className={`${faIcon} me-2 me-xl-3 text-primary`}/>
                <span dangerouslySetInnerHTML={{__html: title}}/>
            </h4>


            {onClose && (
                <CircularButton onClick={onClose}
                                faIcon={`fa-solid fa-xmark`}
                                size={CircularButton.Sizes.LARGE}
                                variant={CircularButton.Variants.DEFAULT}
                                tooltip={tooltip || language.getString("close_window")}/>
            )}
        </div>
    )
}

function ModalWrapperBody({ children, className }) {
    return (
        <div className={`modal-body ${className}`}>
            {children}
        </div>
    )
}

function ModalWrapperFooterDescription({ title, description, faIcon }) {
    return (
        <div className={`modal-footer`}>
            <h6 className={`modal-footer-title text-default`}>
                <i className={`${faIcon} text-primary me-2 eq-h5`}/>
                <span className={`fw-bold`} dangerouslySetInnerHTML={{__html: title}}/>
            </h6>

            <div className={`modal-footer-description text-1`}
                 dangerouslySetInnerHTML={{__html: description}}/>
        </div>
    )
}

export {ModalWrapper, ModalWrapperTitle, ModalWrapperBody, ModalWrapperFooterDescription}