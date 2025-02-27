import React from 'react';

import styles from './HeroSection.module.css';
import { HomeDocument } from '../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

import {
  useWindowStore,
  useScrollStore,
} from '../../../../../stores/useWindowStore';

import Arrow from '../../Icons/Arrow';
import { asText } from '@prismicio/client';
import SectionContainer from './SectionContainer';

export default function HeroSection({
  page,
  id,
}: {
  page: HomeDocument;
  id: string;
}) {
  const { setWindowState } = useWindowStore();
  const { setIsScroll, isScroll } = useScrollStore();

  const onSeeMoreClick = () => {
    setWindowState('front');

    setIsScroll(false);
  };

  return (
    <SectionContainer id={id}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.contentContainer}>
            <div className={styles.textContainer}>
              <PrismicRichText field={page.data.hero_title} />
              <PrismicRichText field={page.data.hero_description} />
            </div>

            <div className={styles.buttonsContainer}>
              {!isScroll ? (
                page.data.landing_buttons.map((item, index: number) => (
                  <div
                    key={index}
                    className={styles.button}
                    onClick={() => {
                      setWindowState(asText(item.button_text).toLowerCase());
                    }}
                  >
                    <PrismicRichText field={item.button_text} />
                  </div>
                ))
              ) : (
                <div
                  className={styles.button}
                  onClick={() => {
                    onSeeMoreClick();
                  }}
                >
                  GET INTERACTIVE
                </div>
              )}
            </div>
            <div
              className={`${styles.arrowContainer} ${!isScroll ? styles.show : ''}`}
              onClick={() => {
                setIsScroll(true);
                setWindowState('front');
              }}
            >
              <Arrow height={18} fill={'var(--darkgreen)'} />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
