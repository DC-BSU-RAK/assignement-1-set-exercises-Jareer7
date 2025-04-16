const audioSamples = [
    { id: 1, name: "Ah-Ha", file: "ah-ha.mp3" },
    { id: 4, name: "Dan", file: "dan.mp3" },
    { id: 5, name: "Back of the net", file: "back-of-the-net.mp3" },
    { id: 7, name: "Bang out of order", file: "bangoutoforder.mp3" },
    { id: 2, name: "email of the evening", file: "emailoftheevening.mp3" },
    { id: 6, name: "i ate a scotch egg", file: "iateascotchegg.mp3" },
    { id: 3, name: "im confused", file: "imconfused.mp3" },
    { id: 8, name: "Hello Partridge", file: "hellopartridge.mp3" },
  
  ];
  
  let currentPage = 0;
  const itemsPerPage = 9;
  
  function loadSamples() {
    const sampleContainer = document.getElementById('samples');
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageSamples = audioSamples.slice(start, end);
  
    sampleContainer.innerHTML = '';
    pageSamples.forEach(sample => {
      const audio = new Audio(`audio/${sample.file}`);
      audio.addEventListener('loadedmetadata', () => {
        const btn = document.createElement('div');
        btn.className = 'sample';
        btn.innerHTML = `
          <div><strong>${sample.id}.</strong></div>
          <div><b>${sample.name}</b></div>
          <div>${audio.duration.toFixed(2)}</div>
        `;
        btn.onclick = () => {
          audio.currentTime = 0;
          audio.play();
        };
        sampleContainer.appendChild(btn);
      });
    });
  
    document.getElementById('bank-title').textContent = `Sample Bank ${currentPage + 1}`;
    document.getElementById('prev').style.display = currentPage === 0 ? 'none' : 'inline-block';
    document.getElementById('next').style.display = end >= audioSamples.length ? 'none' : 'inline-block';
  }
  
  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
      loadSamples();
    }
  }
  
  function nextPage() {
    if ((currentPage + 1) * itemsPerPage < audioSamples.length) {
      currentPage++;
      loadSamples();
    }
  }
  
  function speakText() {
    const text = document.getElementById("tts").value;
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  }
  
  window.onload = loadSamples;
  