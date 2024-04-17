const Crausel=()=>{

    const img1=require("./image.png");
    const img2=require("./th (1).jpeg");
    const img3=require("./th (2).jpeg");

    return (<>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img src={img1} class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
            <img src={img2} class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
            <img src={img3} class="d-block w-100" alt="..." />
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    </>)
}
export default Crausel