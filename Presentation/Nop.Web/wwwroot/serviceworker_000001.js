
                    self.addEventListener('install', async event => {
                        console.log('Installed')
                    });
                    self.addEventListener('fetch', async event => {
                        console.log('Fetched')
                    });