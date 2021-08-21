
export const buttonVariants = {
    initial: {x: -1000, scale: 1},
    animate: {x: 0},
    onHover:{scale: 1.2, originX: 0},
    transition:{
        type:"tween",
        delay: 1,
        duration: 2        
      }
  }
  
  export const topCardVariants = {
    initial: {x: 1000, scale: 1},
    animate: {x: 0},
    transition:{
        type:"tween",
        delay: 1,
        duration: 2        
      }
  }
  
 