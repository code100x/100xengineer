const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const agentRoutes = require('./agent');

app.use(cors());
app.use(express.json());
app.use('/api', agentRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});