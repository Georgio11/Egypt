let containerDown = document.querySelector('.item');
let containerCenter = document.querySelector('.item1');
let containerUp = document.querySelector('.item2');
let blocksDown = Array.from(containerDown.querySelectorAll('.block'));
let blocksCenter = Array.from(containerCenter.querySelectorAll('.block'));
let blocksUp = Array.from(containerUp.querySelectorAll('.block'));
let startBtn = document.querySelector('.start_btn');
let startBtnText = document.querySelector('.start_btn p');
let wrapper = document.querySelector('.wrapper');
let langBtn = document.querySelector(".curent");
let langBtnText = document.querySelector(".curent p");
let listElems = document.querySelectorAll(".lang_list li");
let langList = document.querySelector(".lang_list");
let threeangle = document.querySelector(".curent span");
let text = document.querySelector('.text p');
let modal = document.querySelector('.modal');
let modalText1 = document.querySelector(".modal p:nth-child(1)");
let modalText2 = document.querySelector(".modal p:nth-child(2)");
let modalText3 = document.querySelector(".modal p:nth-child(3)");
let modalBtn = document.querySelector(".modal a");

let count = 0;

let outputArrayDown = [];
let outputArrayUp = [];
let outputArrayCenter = [];
  
// Splitting the array into five separate arrays for containers
for (let i = 0; i < 5; i++) {
    var subArray = blocksDown.slice(i * 5, (i + 1) * 5);
    outputArrayDown.push(subArray);
    var subArray = blocksUp.slice(i * 5, (i + 1) * 5);
    outputArrayUp.push(subArray);
    var subArray = blocksCenter.slice(i * 5, (i + 1) * 5);
    outputArrayCenter.push(subArray);
}
  
  
// Arrays flip for containers
outputArrayDown.reverse();
outputArrayUp.reverse();
outputArrayCenter.reverse();

// click function
function animateBlocks() {
    if(count == 0) {
        // Animation for containerDown
        outputArrayDown.forEach((subArray, index) => {
            setTimeout(() => {
                subArray.forEach((block, subIndex) => {
                    setTimeout(() => {     // Fall
                        block.style.transform = 'translateY(' + (containerUp.offsetHeight ) + 'px)'; 
                    }, subIndex * 80);
                });
            }, index * 80);
        });
    
        // Animation for containerUp
        setTimeout(() => {     // Second container fall delay
            outputArrayCenter.forEach((subArray, index) => {
                setTimeout(() => {
                    subArray.forEach((block, subIndex) => {
                        setTimeout(() => {     // Fall
                            block.style.transform = 'translateY(' + containerUp.offsetHeight + 'px)'; 
                            block.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, subIndex * 80);
                        setTimeout(() => {     // Bounce
                            let imgElement = block.querySelector('img');
                            imgElement.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'; 
                            imgElement.style.transform = 'translateY(50px) scaleY(0.7)'; 
                        }, subIndex * 80 + 150);
                        setTimeout(() => {     // Going back
                            let imgElement = block.querySelector('img');
                            imgElement.style.transform = 'translateY(0) scaleY(1)'; 
                        }, subIndex * 80 + 300);
                    });
                }, index * 80);
            });
            outputArrayUp.forEach((subArray, index) => {
                setTimeout(() => {
                    subArray.forEach((block, subIndex) => {
                        setTimeout(() => {     // Fall
                            block.style.transform = 'translateY(' + (containerUp.offsetHeight ) + 'px)'; 
                        }, subIndex * 80);
                    });
                }, index * 80);
            });
        }, outputArrayDown.length * 80);
    } else {
        outputArrayCenter.forEach((subArray, index) => {
            setTimeout(() => {
                subArray.forEach((block, subIndex) => {
                    setTimeout(() => {     // Fall
                        block.style.transform = 'translateY(' + (containerUp.offsetHeight *2 ) + 'px)'; 
                    }, subIndex * 80);
                });
            }, index * 80);
        });
        
        // Animation for containerUp
        setTimeout(() => {     // Second container fall delay
            outputArrayUp.forEach((subArray, index) => {
                setTimeout(() => {
                    subArray.forEach((block, subIndex) => {
                        setTimeout(() => {     // Fall
                            block.style.transform = 'translateY(' + containerUp.offsetHeight*2 + 'px)'; 
                            block.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, subIndex * 80);
                        setTimeout(() => {     // Bounce
                            let imgElement = block.querySelector('img');
                            imgElement.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'; 
                            imgElement.style.transform = 'translateY(50px) scaleY(0.7)'; 
                        }, subIndex * 80 + 150);
                        setTimeout(() => {     // Going back
                            let imgElement = block.querySelector('img');
                            imgElement.style.transform = 'translateY(0) scaleY(1)'; 
                        }, subIndex * 80 + 300);
                        setTimeout(() => {
                            modal.classList.add('active');
                        }, subIndex * 80 + 3600);
                        setTimeout(() => {
                            modal.classList.add('opacity');
                        }, subIndex * 80 + 3700);
                    });
                }, index * 80);
            });
        }, outputArrayDown.length * 80);
        startBtn.classList.add('close');
    }
    
    console.log(count)
    count++;
    
}



function shuffleImages(blocks) {

    let elems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    
    // Mixing numbers in the array
    for (let i = elems.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [elems[i], elems[j]] = [elems[j], elems[i]];
    }
    
    // Substituting random images into a blocks
    blocks.forEach((block, index) => {
        let imgElement = block.querySelector('img');
        let imgNumber;
        
        // Substituting winning images into a second row
        if (blocks === blocksUp && index >= 5 && index <= 9) {
            imgNumber = 11; 
            block.classList.add('bonus');
        } else if (index < 5) { 
            imgNumber = elems[index];
        } else if (index > 4 && index < 10) { 
            imgNumber = elems[index - 3];
        }
         else { 
            imgNumber = elems[index - 5];
        }
        
        imgElement.src = 'images/elem/' + imgNumber + '.webp';
    });
}

shuffleImages(blocksUp);
shuffleImages(blocksDown);
shuffleImages(blocksCenter);

function adaptationElements() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const aspectClass = aspectRatio >= 1.9
        ? 'modificate1'
        : aspectRatio >= 1.5
            ? 'modificate2'
            : aspectRatio > 1
                ? 'modificate3'
                : 'modificate4';

    wrapper.className = `wrapper ${aspectClass}`;
}

adaptationElements();

window.addEventListener('resize', adaptationElements);

langBtn.addEventListener('click', () => {
    langList.classList.toggle('active');
    threeangle.classList.toggle('active');
});

listElems.forEach(listElem => {
    listElem.addEventListener('click', (e) => {
        const value = e.target.textContent;
        langBtnText.innerHTML = value;
        
        if (value === 'hi') {
            text.innerHTML = 'स्लॉट्स स्पिन करें <br><span>अपने बोनस का दावा करें</span>';
            startBtnText.innerHTML = 'घुमाना';
            modalText1.innerHTML = 'स्वागत बोनस';
            modalText2.innerHTML = 'पहली तीन जमाओं पर 375% प्राप्त करें';
            modalText3.innerHTML = '₹36,000 तक';
            modalBtn.innerHTML = 'अभी पकड़ो';
        } else {
            text.innerHTML = 'Spin the slots, <br><span>claim your bonus</span>';
            startBtnText.innerHTML = 'spin';
            modalText1.innerHTML = 'Welcome Bonus';
            modalText2.innerHTML = 'Get 375% on first 3 deposits';
            modalText3.innerHTML = 'Up to ₹36,000';
            modalBtn.innerHTML = 'Grab now';
        }

        langList.classList.remove('active');
        threeangle.classList.remove('active');
    });
});