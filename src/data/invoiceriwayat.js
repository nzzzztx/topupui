import logoIcon from "../assets/img/logo.png";

export const handlePrintInvoiceRiwayat = (trx) => {
  if (!trx) return;

  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) return;

  const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("id-ID");

  const formatDate = (date) =>
    date ? new Date(date).toLocaleString("id-ID") : "-";

  const productName =
    typeof trx.product === "object" ? trx.product?.name : trx.product;

  const subtotal = trx.totalPrice || trx.total || trx.price || 0;

  const qrData = `
  Invoice: ${trx.id}
  Produk: ${productName}
  Tanggal: ${formatDate(trx.createdAt || trx.date)}
  Total: Rp ${subtotal}
  Status: ${trx.status}
  `;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;

  invoiceWindow.document.write(`
    <html>
      <head>
        <title>Struk ${trx.id}</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            background: #f3f3f3;
            display: flex;
            justify-content: center;
            padding: 20px;
          }

          .receipt {
            width: 340px;
            background: white;
            padding: 20px;
            border-radius: 6px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }

          .center { text-align: center; }
          .bold { font-weight: bold; }
          .small { font-size: 12px; color: #666; }

          .logo {
            width: 70px;
            margin-bottom: 5px;
          }

          .line {
            border-top: 1px dashed #999;
            margin: 12px 0;
          }

          .row {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            margin: 4px 0;
          }

          .total {
            font-size: 16px;
            font-weight: bold;
          }

          .status {
            background: #d1fae5;
            color: #065f46;
            padding: 6px;
            text-align: center;
            border-radius: 4px;
            margin: 10px 0;
            font-weight: bold;
          }

          .footer {
            margin-top: 15px;
            font-size: 11px;
            color: #777;
            text-align: center;
          }

          @media print {
            body { background: white; }
            .receipt { box-shadow: none; }
          }
        </style>
      </head>

      <body>
        <div class="receipt">

          <div class="center">
            <img class="logo" src="${logoIcon}" />
          </div>

          <div class="center bold">
            XMLTOPUP
          </div>

          <div class="center small">
            Platform Top Up & Game Digital
          </div>

          <div class="center small">
            www.xmltopup.com
          </div>

          <div class="line"></div>

          <div class="row">
            <span>No Invoice</span>
            <span>INV-${trx.id}</span>
          </div>

          <div class="row">
            <span>Tanggal</span>
            <span>${formatDate(trx.createdAt || trx.date)}</span>
          </div>

          <div class="line"></div>

          <div class="row">
            <span>Jenis</span>
            <span>Top Up Game</span>
          </div>

          <div class="row">
            <span>Produk</span>
            <span>${productName}</span>
          </div>

          <div class="row total">
            <span>Total Bayar</span>
            <span>Rp ${formatCurrency(subtotal)}</span>
          </div>

          <div class="status" style="
          background: ${
            trx.status === "success"
              ? "#d1fae5"
              : trx.status === "pending"
                ? "#fef9c3"
                : "#fee2e2"
          };
          color: ${
            trx.status === "success"
              ? "#065f46"
              : trx.status === "pending"
                ? "#854d0e"
                : "#991b1b"
          };
        ">
          ${trx.status.toUpperCase()}
        </div>

          <div class="line"></div>

          <div class="center">
            <img src="${qrUrl}" />
          </div>

          <div class="footer">
            Scan QR untuk verifikasi transaksi<br/>
            Simpan struk ini sebagai bukti pembayaran<br/><br/>
            Terima kasih telah menggunakan XMLTOPUP 🙏
          </div>

        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            }
          }
        </script>

      </body>
    </html>
  `);

  invoiceWindow.document.close();
};
