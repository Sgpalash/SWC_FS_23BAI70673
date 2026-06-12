document.addEventListener('DOMContentLoaded', ()=>{
    const pb = document.querySelector('.hero-banner .btn-light')
    const mi = document.querySelector('.hero-banner .btn-secondary')

    if(pb)
    {
        pb.onclick=function()
        {
            alert("Video is playing");
        }
    }

    if(mi)
    {
        mi.onclick=function()
        {
            alert("STRANGER THINGS\n\nRating: TV-14\nSeasons: 4\nGenre: Sci-Fi, Horror, Drama");
        }
    }
});
