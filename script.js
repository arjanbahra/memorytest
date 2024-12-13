// List of images categorized by difficulty
const images = {
    easy: [
      { src: "https://img.freepik.com/premium-photo/bowl-apples-wooden-table_865967-6448.jpg", keywords: ["apple", "table", "wood"] },
      { src: "https://media.istockphoto.com/id/993963182/photo/dog-with-ball-in-his-mouth-is-running-across-the-meadow-against-a-blue-sky-as-background-small.jpg?s=612x612&w=0&k=20&c=TzvwSHTZ4QH6cFZvM3-tDRbH04v5GtKzOoobtBIcBt4=", keywords: ["dog", "grass", "ball"] },
      { src: "https://img.freepik.com/premium-photo/green-grass-green-trees-beautiful-park-white-cloud-blue-sky-noon-beautiful-park-scene-public-park-with-green-grass-field-green-tree-plant-party-cloudy-blue-sky_1033579-193656.jpg", keywords: ["sun", "sky", "tree"] },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmFxSTUicDTIXi8D72vAmN6Bg-EfP06uk_g&s", keywords: ["book", "pen", "desk"] },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dhHkOGnJz_7EjeS-b8N7toVC1jcTQ0Gg1g&s", keywords: ["cup", "coffee", "saucer"] }
    ],
    medium: [
      { src: "https://images.pexels.com/photos/16963044/pexels-photo-16963044/free-photo-of-rough-ocean-with-waves-and-a-sandy-beach-with-palm-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", keywords: ["beach", "palm", "sand"] },
      { src: "https://flux-image.com/_next/image?url=https%3A%2F%2Fai.flux-image.com%2Fflux%2Fda53a577-2965-4186-bc87-fc52e65201d1.jpg&w=3840&q=75", keywords: ["mountain", "snow", "cloud"] },
      { src: "https://static.vecteezy.com/system/resources/previews/050/385/125/non_2x/a-bright-and-peaceful-view-of-a-lush-forest-with-a-crystal-clear-stream-that-reveals-the-rocks-beneath-sunlight-filters-through-tall-trees-no-people-a-natural-scene-suitable-for-ecotourism-free-photo.jpg", keywords: ["forest", "river", "rocks"] },
      { src: "https://thumbs.dreamstime.com/b/ferry-boat-crossing-under-suspension-bridge-halifax-nova-scotia-thick-fog-ai-generative-ferry-boat-crossing-under-325090162.jpg", keywords: ["bridge", "water", "boat"] },
      { src: "https://img.freepik.com/premium-photo/bustling-city-street-night-with-people-crossing-road-cars-driving-by-street-is-lit-up-by-bright-lights-city_36682-7260.jpg", keywords: ["city", "lights", "cars"] }
    ],
    hard: [
      { src: "https://img.freepik.com/premium-photo/shows-large-modern-office-building-with-lot-glass-windows-building-is-surrounded_636537-291326.jpg", keywords: ["building", "glass", "reflection"] },
      { src: "https://media.newyorker.com/photos/6196d0fe990636d08e02cd92/16:9/w_1280,c_limit/211129_r39422web-tout.jpg", keywords: ["maze", "path", "walls"] },
      { src: "https://img.freepik.com/premium-photo/abstract-modern-art-with-colorful-chaotic-blend-acrylic-oil-paint-strokes_818261-10959.jpg", keywords: ["painting", "colors", "abstract"] },
      { src: "https://img.freepik.com/premium-photo/bustling-market-scene-filled-with-colorful-spices-fruits-people-shopping_931778-40853.jpg", keywords: ["market", "crowd", "shop"] },
      { src: "https://img.freepik.com/premium-photo/image-is-beautiful-depiction-starry-night-sky-there-are-many-stars-planets-galaxies-image-colors-are-vibrant-bright_14117-265190.jpg", keywords: ["planet", "stars", "galaxy"] }
    ]
  };
  
  // Randomly select one image from each difficulty
  const selectedImages = [
    images.easy[Math.floor(Math.random() * images.easy.length)],
    images.medium[Math.floor(Math.random() * images.medium.length)],
    images.hard[Math.floor(Math.random() * images.hard.length)]
  ];
  
  let currentIndex = 0;
  let userResponses = [];
  
  // Show the welcome screen
  document.getElementById("start-button").addEventListener("click", () => {
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("instructions-container").style.display = "block";
  });
  
  // Show the instructions screen
  document.getElementById("continue-button").addEventListener("click", () => {
    document.getElementById("instructions-container").style.display = "none";
    document.getElementById("test-container").style.display = "block";
    showImage();
  });
  
  function showImage() {
    const imageElement = document.getElementById("image");
    const responseBox = document.getElementById("response");
    const submitButton = document.getElementById("submit");
  
    if (currentIndex < selectedImages.length) {
      const currentImage = selectedImages[currentIndex];
  
      // Display the image for 5 seconds
      imageElement.src = currentImage.src;
      imageElement.style.display = "block";
      responseBox.style.display = "none";
      submitButton.style.display = "none";
  
      setTimeout(() => {
        imageElement.style.display = "none";
        responseBox.style.display = "block";
        submitButton.style.display = "block";
        responseBox.focus();
  
        // Allow 5 seconds for response
        setTimeout(() => {
          saveResponse(responseBox.value);
        }, 5000);
      }, 5000);
    } else {
      calculateResults();
    }
  }
  
  function saveResponse(response) {
    const responseBox = document.getElementById("response");
    userResponses.push(response.trim());
    responseBox.value = "";
    currentIndex++;
    showImage();
  }
  
  function calculateResults() {
    const resultContainer = document.getElementById("result-container");
    let totalKeywords = 0;
    let matchedKeywords = 0;
  
    selectedImages.forEach((image, index) => {
      const response = userResponses[index].toLowerCase();
      const keywords = image.keywords;
  
      keywords.forEach(keyword => {
        if (response.includes(keyword)) {
          matchedKeywords++;
        }
      });
  
      totalKeywords += keywords.length;
    });
  
    const score = (matchedKeywords / totalKeywords) * 100;
  
    resultContainer.innerHTML = `
      <h2>Results</h2>
      <p>You matched ${matchedKeywords} out of ${totalKeywords} keywords.</p>
      <p>Your memory is: ${score >= 70 ? "Good" : score >= 40 ? "Average" : "Poor"}</p>
    `;
  }
  