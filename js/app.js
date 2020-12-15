function handleClick(){    
    let inspectionsDiv = document.getElementsByClassName("inspections");
    let lengthOfArray = inspectionsDiv.length;
        
    for (var i=0; i<lengthOfArray;i++){
        inspectionsDiv[i].style.visibility='visible';
        if (inspectionsDiv[i].style.visibility === 'hidden') {
            inspectionsDiv[i].style.visibility = 'visible';
          } else {
            inspectionsDiv[i].style.visibility = 'hidden';
          }
    }
}