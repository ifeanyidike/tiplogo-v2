import {
    firstCardContainerVariants,
    secondCardContainerVariants,
    thirdCardContainerVariants,
    fourthCardContainerVariants
} from '../animationVariants/CardVariants'




export const altCardFeatures = [
    {
        title: 'Buy Waec Scratch Cards, Tokens, e-PIN',
        anchor: "Buy Now!",
        color: 'darkblue',
        variants: firstCardContainerVariants,
    },
    {

        title: 'Buy Nabteb Cards, Tokens, and PINs',
        anchor: "Buy Now!",
        color: 'lightgreen',
        variants: secondCardContainerVariants,
    },
    {
        title: 'Buy Neco Cards, Result Checker, PINs',
        anchor: "Buy Now!",
        color: 'lightblue',
        variants: thirdCardContainerVariants,
    },
    {
        title: "Get Jamb UTME, Jamb DE, Cards, PINs",
        anchor: "Buy Now!",
        color: 'goldish',
        variants: fourthCardContainerVariants,
    }

]

export const counter = [
    {
        icon: "fas fa-users",
        max: "1000",
        description: "lorem posium"
    },
    {
        icon: "fas fa-user",
        max: "500",
        description: "lorem posium"
    },
    {
        icon: "fab fa-servicestack",
        max: "100",
        description: "lorem posium",
    }


]


export const topcard_features = [
    {
        icon: "fas fa-exchange-alt",
        title: "Data correction",
        bcolor: "darkblue",
        href: '/data-correction/change-of-course-institution'
    },
    {
        icon: "fas fa-sliders-h",
        title: "Password reset",
        bcolor: "darkred",
        href: '/data-correction/jamb-password-reset'
    },
    {
        icon: "fas fa-cloud-upload-alt",
        title: "Result upload",
        bcolor: "lightgray",
        href: '/data-correction/result-upload'
    },
    {
        icon: "fas fa-shopping-cart",
        title: "Buy pin",
        bcolor: "goldish",
        href: '/allcards'
    },
]