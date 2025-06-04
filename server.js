const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// استخدام ضغط gzip لتحسين الأداء
app.use(compression());

// تعيين المجلد الذي يحتوي على الملفات الثابتة
app.use(express.static(path.join(__dirname, 'dist')));

// توجيه جميع الطلبات إلى index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
  console.log(`يمكنك الوصول إلى الموقع عبر: http://localhost:${PORT}`);
});
