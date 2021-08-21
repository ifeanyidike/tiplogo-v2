export const backdropVariant = {
    hidden: {x: 0},
    visible: {
        x: 0,
        duration: 1
    },  
      
}

export const drawerVariant = {
    hidden: {
        x: 0,        
    },  
    visible: {
        x: 200,        
        transition: {
            delay: 0.1,
            duration: 5
        }
    }
}

export const closeVariant = {
    hidden: {
        x: -100,        
    },  
    visible: {
        x: 0,        
        transition: {
            delay: 0.1,
            duration: 5
        }
    },
    onHover:{
        scale: 1.1
      }
}


export const closeLeftVariants = {
    hidden: {rotate: -120, scale: 2},
    visible: {
      scale: 1,
      rotate: 45,
      transition: {
        duration: 1
      }
    }    
  }
  
  export const closeRightVariants = {
    hidden: {rotate: -240, scale: 2},
    visible: {
      scale: 1,
      rotate: 135,
      transition: {
        duration: 1
      }
    }    
  }
  
  export const mainListVariants = {
    initial: {opacity: 0},
    animate:{
      when: "beforeChildren",
      opacity: 1},
    
  }
  
  export const firstListVariants = {
    initial:{
      x: '-1000px'
    },
    animate:{
      x: 0,
      transition:{
        duration: 1,
        delay: 5
      }
    }
  }
  
  export const secondListVariants = {
    initial:{
      x: '-1000px'
    },
    animate:{
      x: 0,
      transition:{
        duration: 1,
        delay: 7
      }
    }
  }
  
  export const thirdListVariants = {
    initial:{
      x: '-1000px'
    },
    animate:{
      x: 0,
      transition:{
        duration: 1,
        delay: 9
      }
    }
  }
  
  export const fourthListVariants = {
    initial:{
      x: '-1000px'
    },
    animate:{
      x: 0,
      transition:{
        duration: 1,
        delay: 11
      }
    }
  }