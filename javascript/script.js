let scrollView = document.getElementById("bannerscrollview");
let container = document.getElementById("bannerimagecontainer");

let bannerImageArray = [];

let bannerScrollTimer = null;

let bannerIndex = 0;

new Promise(function (resolve, reject){
    setTimeout(function(){
        console.log("模拟网络请求");
        const bannerImages = ["https://img.alicdn.com/imgextra/i2/6000000001110/O1CN01rbanvT1K4QQe4nCpW_!!6000000001110-2-octopus.png",
                              "https://img.alicdn.com/imgextra/i4/6000000000541/O1CN01vD3gf31Frp42qNJJV_!!6000000000541-0-octopus.jpg",
                              "https://img.alicdn.com/imgextra/i3/6000000003169/O1CN011X8yBI1ZHRvYFJzyc_!!6000000003169-2-octopus.png",
                              "https://img.alicdn.com/imgextra/i4/6000000002379/O1CN0159I5JC1TRd2BY8Kdh_!!6000000002379-0-octopus.jpg",
                              "https://img.alicdn.com/imgextra/i2/6000000002022/O1CN01d4llv31Qo7dRMcEtM_!!6000000002022-0-octopus.jpg",
                              "https://img.alicdn.com/imgextra/i3/6000000005061/O1CN018qSeVN1nFzHWDRCu2_!!6000000005061-0-octopus.jpg",
                              "https://img.alicdn.com/imgextra/i2/6000000000603/O1CN01yuhivj1GKDcaXG3mE_!!6000000000603-0-octopus.jpg"];
        bannerImageArray = bannerImages;
        bannerChangeIndex(0);
        for(let i = 0; i < bannerImageArray.length; i++){
            let pagedot = document.createElement("a");
            if(i === 0){
                pagedot.className = 'selectpagedot';
            }else{
                pagedot.className = 'pagedot';
            }
            let margin = (document.getElementById('pagedotcontainer').clientWidth - 60 - bannerImageArray.length * 10)/(2 * bannerImageArray.length);
            if(margin > 5){
                margin = 5;
            }
            pagedot.setAttribute('index',i);
            pagedot.addEventListener('click',function(){
                bannerIndex = i;
                bannerChangeIndex(i);
            });
            pagedot.style.margin = '0px ' + (margin).toString() + 'px';
            document.getElementById('pagedotcontainer').appendChild(pagedot);
        }
    },300);
});

(function bannerInit(){
    scrollView.scrollTo(container.clientWidth/3,0);
    
})()

scrollView.addEventListener('scroll',bannerScroll);

function bannerScroll(){
    clearTimeout(bannerScrollTimer);
    const startX = scrollView.scrollLeft;
    bannerScrollTimer = setTimeout(function(){
        const endX = scrollView.scrollLeft;
        if(startX === endX){
            console.log("scrollend");
            if(endX > 600){
                bannerScrollToNext();
            }else if(endX < 200){
                bannerScrollToFront();
            }else{
                scrollView.scrollTo(container.clientWidth/3,0);
            }
        }
    },100);
}

function bannerScrollToFront() {
    scrollView.scrollTo(0,0);
    bannerIndex--;
    if(bannerIndex >= bannerImageArray.length){
        bannerIndex = 0;
    }else if(bannerIndex < 0){
        bannerIndex = bannerImageArray.length - 1;
    }
    bannerChangeIndex(bannerIndex);
}

function bannerScrollToNext() {
    scrollView.scrollTo(container.clientWidth/3 * 2,0);
    bannerIndex++;
    if(bannerIndex >= bannerImageArray.length){
        bannerIndex = 0;
    }else if(bannerIndex < 0){
        bannerIndex = bannerImageArray.length - 1;
    }
    bannerChangeIndex(bannerIndex);
}

function bannerChangeIndex(index){
    const bannerCurrentImage = document.getElementById("secondbannerimage");
    const bannerFrontImage = document.getElementById("firstbannerimage");
    const bannerNextImage = document.getElementById("thirdbannerimage");
    bannerCurrentImage.src = bannerImageArray[index];
    scrollView.scrollTo(container.clientWidth/3,0);
    if(index - 1 < 0){
        bannerFrontImage.src = bannerImageArray[bannerImageArray.length - 1];
    }else{
        bannerFrontImage.src = bannerImageArray[index - 1];
    }
    if(index + 1 >= bannerImageArray.length){
        bannerFrontImage.src = bannerImageArray[0];
    }else{
        bannerNextImage.src = bannerImageArray[index + 1];
    }
    let i;
    let pagedots = document.getElementsByClassName("selectpagedot");
    for (i = 0; i < pagedots.length; i++) {
        pagedots[i].className = 'pagedot';
   }
    pagedots = document.getElementsByClassName("pagedot");
    for (i = 0; i < pagedots.length; i++) {
        if(pagedots[i].attributes['index'].value === index.toString()){
           pagedots[i].className = 'selectpagedot';
        }
   }
   
}