document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const convertBtn = document.getElementById('convertBtn');
    const output = document.getElementById('output');

    convertBtn.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select a HEIC file first.');
            return;
        }

        try {
            const jpgBlob = await heic2any({
                blob: file,
                toType: 'image/jpeg',
                quality: 0.8
            });
            const url = URL.createObjectURL(jpgBlob);
            output.src = url;
            output.style.display = 'block';
            
            // Optional: trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name.replace('.heic', '.jpg');
            a.click();
        } catch (error) {
            console.error('Conversion failed:', error);
            alert('Conversion failed. Please make sure you selected a valid HEIC file.');
        }
    });
});