import React, { FC, ReactNode } from 'react';
import styles from '../../css/components/default/area.module.scss';
import defaultStyles from '../../css/default.module.scss';
import { Link } from 'react-router-dom';

// hero area
interface HeroAreaProps {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    clsOuter?: string;
    clsInner?: string;
    clsBtn?: string;
    fullWidth?: boolean;
    image?: string;
    imageAlt?: string;
    buttonTwoText?: string;
    buttonTwoLink?: string;
    clsBtnTwo?: string;
}
export const HeroArea: FC<HeroAreaProps> = ({
    title,
    description,
    buttonText,
    buttonLink,
    clsOuter = '',
    clsInner = '',
    clsBtn = defaultStyles.btnPrimary,
    fullWidth,
    image,
    imageAlt,
    buttonTwoText,
    buttonTwoLink,
    clsBtnTwo = defaultStyles.btnSecondary,
}) => {
    const outerClasses = `${styles.heroAreaOuter} ${clsOuter}`;
    const innerClasses = `${styles.heroAreaInner} ${fullWidth ? styles.fullWidth : ''} ${clsInner}`;
    const samePageLinkOne = buttonLink[0] === '#';
    const samePageLinkTwo = buttonTwoLink && buttonTwoLink[0] === '#';

    return (
        <Section clsOuter={outerClasses} clsInner={innerClasses} tag='section'>
            <div className={styles.textAndButtonContainer}>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className={`${defaultStyles.buttonsContainer} ${defaultStyles.largeButtons}`}>
                    {samePageLinkOne ? (
                        <a href={buttonLink} className={clsBtn}>
                            {buttonText}
                        </a>
                    ) : (
                        <Link to={buttonLink} className={clsBtn}>
                            {buttonText}
                        </Link>
                    )}
                    {buttonTwoLink &&
                        (samePageLinkTwo ? (
                            <a href={buttonTwoLink} className={clsBtnTwo}>
                                {buttonTwoText}
                            </a>
                        ) : (
                            <Link to={buttonTwoLink} className={clsBtnTwo}>
                                {buttonTwoText}
                            </Link>
                        ))}
                </div>
            </div>
            {image && <img src={image} alt={imageAlt} />}
        </Section>
    );
};

// section
interface SectionProps {
    children: ReactNode;
    clsOuter?: string;
    clsInner?: string;
    tag?: any;
    patterned?: boolean;
    id?: string;
}
export const Section: FC<SectionProps> = ({
    children,
    clsOuter = '',
    clsInner = '',
    patterned,
    tag: Tag = 'section',
    id,
}) => {
    const outerClasses = `${defaultStyles.outer} ${patterned ? defaultStyles.patterned : ''} ${clsOuter}`;
    const innerClasses = `${defaultStyles.inner} ${clsInner}`;

    return (
        <Tag id={id} className={outerClasses}>
            <div className={innerClasses}>{children}</div>
        </Tag>
    );
};
