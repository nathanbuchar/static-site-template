#!/usr/bin/node

// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Assigns specialty pages to a statis website hosted on
 * Google Cloud Storage.
 *
 * @see http://g.co/cloud/storage/docs/hosting-static-website#specialty-pages
 */

require('dotenv/config');

const { Storage } = require('@google-cloud/storage');

// The ID of your GCS bucket
const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME;

// The name of the main page
const mainPageSuffix = 'index.html';

// The Name of a 404 page
const notFoundPage = process.env.GOOGLE_CLOUD_NOT_FOUND_PAGE;

// Creates a client
const storage = new Storage();

async function addBucketWebsiteConfiguration() {
  await storage.bucket(bucketName).setMetadata({
    website: {
      mainPageSuffix,
      notFoundPage,
    },
  });

  console.log(
    `Static website bucket ${bucketName} is set up to use ${mainPageSuffix} as the index page and ${notFoundPage} as the 404 page`
  );
}

addBucketWebsiteConfiguration().catch(console.error);
