const prompt = require('prompt')

prompt.start()


// Function to calculate shear force at a given point
function calculateShearForce(loadDetails, point) {
  let shearForce = 0;
  for (const load of loadDetails) {
      if (load.type === 'point') {
          if (load.position <= point) {
              shearForce -= load.loadVal;
          }
      } else if (load.type === 'uniform') {
          if (load.startsAt <= point && load.endsAt >= point) {
              shearForce -= (load.startValue -load.endValue) * (point - load.startsAt);
          }
      }
  }
  return shearForce;
}

// Function to calculate bending moment at a given point
function calculateBendingMoment(loadDetails, point) {
  let bendingMoment = 0;
  for (const load of loadDetails) {
      if (load.type === 'point') {
          if (load.position <= point) {
              bendingMoment -= load.loadVal * (point - load.position);
          }
      } else if (load.type === 'uniform') {
          if (load.startsAt <= point && load.endsAt >= point) {
              bendingMoment -= (load.startValue-load.endValue) * (point - load.startsAt) * (point - load.startsAt) / 2;
          }
      }
  }
  return bendingMoment;
} // Point where shear force and bending moment are to be calculated


const main = async() => {

  while (true) {
    let loadDetails = []
  
  
  
    console.log('BEam Analysis')
  
    let {loadType} = await prompt.get(['loadType']) 
  
  
    if(loadType=='point') {
  
      console.log('point load')
      
      let {position, loadVal} = await prompt.get(['position', 'loadVal'])
      loadDetails.push({loadType, position, loadVal})
  
    } else {
  
      const {startsAt, startValue, endsAt, endValue} = await prompt.get(['startsAt', 'startValue', 'endsAt', 'endValue'])
  
      loadDetails.push({loadType, startsAt, startValue, endsAt, endValue})
  
    }
  

    const {desiredPoint} = await prompt.get(['desiredPoint'])
    console.log("Enter 1 for shear force and 2 for bending moment\n>>")

    let {reqType} = await prompt.get(['reqType'])
    console.log("you entered", reqType, typeof(reqType))
    if (parseInt(reqType)==1) {
      console.log('sf')
      const shearForce = calculateShearForce(loadDetails, desiredPoint);
      console.log(`SF at ${desiredPoint} is: ${shearForce}`)
      break
    } else if (parseInt(reqType)==2) {
      console.log('bm')
      const bendingMoment = calculateBendingMoment(loadDetails, desiredPoint);
      console.log(`Bending moment at ${desiredPoint} is: ${bendingMoment}`)
      break
    }
  }
}

main()

