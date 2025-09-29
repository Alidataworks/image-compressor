// slider ka value percentage me show karega
document.getElementById("quality").addEventListener("input", function () {
    document.getElementById("qValue").innerText = Math.round(this.value * 100) + "%";
});

function compressImage() {
    const upload = document.getElementById("upload").files[0];
    const canvas = document.getElementById("canvas");
    const msg = document.getElementById("msg");
    const quality = document.getElementById("quality").value;

    if (!upload) {
        msg.innerText = "⚠️ Please select an image first!";
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(upload);

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const ctx = canvas.getContext("2d");

            // Resize max width = 800px
            const MAX_WIDTH = 800;
            let newWidth = img.width;
            let newHeight = img.height;

            if (img.width > MAX_WIDTH) {
                newWidth = MAX_WIDTH;
                newHeight = img.height * (MAX_WIDTH / img.width);
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            // Compress with slider quality
            canvas.toBlob((blob) => {
                const compressedUrl = URL.createObjectURL(blob);

                // Auto download
                const link = document.createElement("a");
                link.href = compressedUrl;
                link.download = "compressed.jpg";
                link.click();

                msg.innerText = "✅ Image compressed & downloaded!";
            }, "image/jpeg", parseFloat(quality));
        };
    };
}
