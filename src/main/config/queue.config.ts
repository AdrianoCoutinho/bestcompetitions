import "dotenv/config";

import createClipJob from "../../app/jobs/create-clip.job";
import Queue from "../../app/queues/queue";

Queue.process(createClipJob.handle);
