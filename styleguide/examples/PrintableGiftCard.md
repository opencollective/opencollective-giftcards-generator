## Default

```js
<PrintableGiftCard
  amount={2500}
  currency="USD"
  code="8X4WWD2G"
  expiryDate="Wed May 13 2020 00:00:00 GMT+0200 (GMT+02:00)"
/>
```

## Customization

```js
<div>
  <PrintableGiftCard
    amount={50000}
    currency="USD"
    code="8X4WWD2G"
    expiryDate="Wed May 13 2020 00:00:00 GMT+0200 (GMT+02:00)"
    style={{ marginRight: 15 }}
    tagline="I have a QR code!"
    withQRCode
  />
  <br />
  <PrintableGiftCard
    amount={4200}
    currency="USD"
    code="8X4WWD2G"
    expiryDate="Wed May 13 2020 00:00:00 GMT+0200 (GMT+02:00)"
    borderRadius="0.2in"
    tagline="I have rounded corners!"
  />
</div>
```
