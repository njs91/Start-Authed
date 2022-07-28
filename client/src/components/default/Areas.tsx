import React, { FC, ReactNode } from 'react';
import styles from '../../css/components/default/area.module.scss';
import defaultStyles from '../../css/default.module.scss';
import { Link } from 'react-router-dom';

// hero area
interface HeroAreaProps extends ButtonsProps {
    title: string;
    description: string;
    clsOuter?: string;
    clsInner?: string;
    fullWidth?: boolean;
    image?: string;
    imageAlt?: string;
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
    const outerClasses: string = `${styles.heroAreaOuter} ${clsOuter}`;
    const innerClasses: string = `${styles.heroAreaInner} ${fullWidth ? styles.fullWidth : ''} ${clsInner}`;
    const btnProps: ButtonsProps = { buttonLink, buttonText, clsBtn, buttonTwoLink, buttonTwoText, clsBtnTwo };

    return (
        <Section clsOuter={outerClasses} clsInner={innerClasses} tag='section'>
            <div className={styles.textAndButtonContainer}>
                <h1>{title}</h1>
                <p>{description}</p>
                <Buttons {...btnProps} />
            </div>
            {image && <img src={image} alt={imageAlt} />}
        </Section>
    );
};

interface ButtonsProps {
    buttonText: string;
    buttonLink: string;
    clsBtn?: string;
    buttonTwoText?: string;
    buttonTwoLink?: string;
    clsBtnTwo?: string;
}
const Buttons: FC<ButtonsProps> = ({ buttonLink, buttonText, clsBtn, buttonTwoLink, buttonTwoText, clsBtnTwo }) => {
    const samePageLinkOne = buttonLink[0] === '#';
    const samePageLinkTwo = buttonTwoLink && buttonTwoLink[0] === '#';

    return (
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
