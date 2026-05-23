const startBtn = document.getElementById('start');
const copyBtn = document.getElementById('copy');
startBtn.addEventListener('click',()=>{
    const roomId = crypto.randomUUID();
    const interviewerLink =
    `/editor.html?room=${roomId}&role=interviewer`;
    const candidateLink =
    `http://localhost:3000/editor.html?room=${roomId}&role=candidate`;
    document.getElementById('link').innerText =
    candidateLink;
    setTimeout(()=>{
        window.location.href = interviewerLink;
    },3000);
});
copyBtn.addEventListener('click',()=>{

    const link =
    document.getElementById('link').innerText;

    navigator.clipboard.writeText(link);

    alert('Link copied!');

});