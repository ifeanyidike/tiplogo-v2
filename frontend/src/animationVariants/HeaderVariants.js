export const svgVariants = {
    hidden: {rotate: 0, scale: 1.1},
    visible: {
      scale: 1,
      rotate: [-5, 5, 0, 5, -5, 0],
      transition: {
        duration: 3
      }
    }
  }
  
  export const pathVariants = {
    hidden:{    
      opacity: 0,
      pathLength: 0
    },
    visible:{      
      opacity: 1,
      pathLength: 1,
      transition:{
        duration: 2,
        ease: "easeInOut"
      }
    }
  }
  
  export const headerRightVariants = {
    hidden: {rotate: 0, scale: 1.1},
    visible: {
      scale: 1,
      rotate: [-5, 5, 0],
      transition: {        
        duration: 1
      }
    }
  }
  
  export const headerTextVariants = {
    initial: { scale: 1},
    onHover:{scale: 1.2}
  }
  
  export const hamburgerVariants = {
    hidden: {rotate: -60, scale: 2},
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1
      }
    },
    onHover:{
      scale: 1.1
    }
  }
  
  export const hamburgerItemsVariants = {
    hidden: {rotate: 180, opacity: 0},
    visible: {
      opacity:1,
      rotate: 0,
      transition: {
        duration: 1
      }
    }    
  }