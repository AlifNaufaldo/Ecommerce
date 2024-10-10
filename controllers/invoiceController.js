const EasyInvoice = require('easyinvoice');
const fs = require('fs')

class invoiceController {
    static async createInvoice(req, res) {
        const invoiceData = req.body; // Ambil data dari body
        // console.log("Received invoice data:", invoiceData); // Log untuk memeriksa data
    
        // Periksa apakah invoiceData tidak kosong
        if (!invoiceData || Object.keys(invoiceData).length === 0) {
            return res.status(400).send({ message: "No data provided" });
        }
    
        const data = {
            sender: {
                company: "BukaToko",
                address: "Jalan. Pahlawan no.7 18B",
                zip: "90225",
                city: "Surabaya",
                country: "Indonesia"
            },
            client: {
                company: invoiceData.clientCompany,
                address: invoiceData.clientAddress,
                zip: invoiceData.clientZip,
                city: invoiceData.clientCity,
                country: invoiceData.clientCountry
            },
            items: invoiceData.items,
            invoiceNumber: invoiceData.invoiceNumber,
            invoiceDate: new Date().toLocaleDateString(),
            footer: "Terima kasih telah berbelanja!"
        };
    
        try {
            const result = await EasyInvoice.createInvoice(data);
            console.log("Invoice Result:", result); // Memeriksa hasil dari EasyInvoice
    
            if (result.pdf) {
                const filePath = `./invoices/invoice_${invoiceData.invoiceNumber}.pdf`;
                fs.writeFileSync(filePath, result.pdf);
                res.download(filePath); // Mengunduh invoice yang telah dibuat
            } else {
                res.status(500).send({ message: "PDF generation failed" });
            }
        } catch (error) {
            console.error("Error generating invoice:", error);
            res.status(500).send({ message: "Error generating invoice", error: error.message });
        }
    }
}
module.exports = invoiceController;




