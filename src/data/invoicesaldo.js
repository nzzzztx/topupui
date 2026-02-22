import logoIcon from "../assets/img/logo.png";

export const handlePrintInvoiceSaldo = (trx) => {
  const invoiceWindow = window.open("", "_blank");

  if (!invoiceWindow) return;

  const statusValue = (trx.status || "").toLowerCase();

  const formattedDate = trx.createdAt
    ? new Date(trx.createdAt).toLocaleString("id-ID")
    : "-";

  const totalAmount = trx.totalPrice || 0;

  const qrData = `
  Invoice: ${trx.id}
  User: ${trx.username}
  Tanggal: ${formattedDate}
  Total: Rp ${totalAmount}
  Status: ${trx.status}
  `;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrData)}`;

  const statusBg =
    statusValue === "success" || statusValue === "berhasil"
      ? "#d1fae5"
      : statusValue === "pending"
      ? "#fef9c3"
      : "#fee2e2";

  const statusColor =
    statusValue === "success" || statusValue === "berhasil"
      ? "#065f46"
      : statusValue === "pending"
      ? "#854d0e"
      : "#991b1b";

  invoiceWindow.document.write(`
    <html>
      <head>
        <title>Struk Saldo ${trx.id}</title>
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

          <div class="center bold">XMLTOPUP</div>
          <div class="center small">Platform Top Up & Saldo Digital</div>

          <div class="line"></div>

          <div class="row">
            <span>No Invoice</span>
            <span>INV-${trx.id}</span>
          </div>

          <div class="row">
            <span>Tanggal</span>
            <span>${formattedDate}</span>
          </div>

          <div class="row">
            <span>Username</span>
            <span>${trx.username}</span>
          </div>

          <div class="line"></div>

          <div class="row">
            <span>Jenis</span>
            <span>Top Up Saldo</span>
          </div>

          <div class="row">
            <span>Metode Bayar</span>
            <span>${trx.method || "-"}</span>
          </div>

          <div class="row total">
            <span>Total Bayar</span>
            <span>Rp ${totalAmount.toLocaleString("id-ID")}</span>
          </div>

          <div class="status" style="background:${statusBg};color:${statusColor};">
            ${(trx.status || "").toUpperCase()}
          </div>

          <div class="line"></div>

          <div class="center">
            <img src="${qrUrl}" />
          </div>

          <div class="footer">
            Simpan struk ini sebagai bukti pembayaran<br/>
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