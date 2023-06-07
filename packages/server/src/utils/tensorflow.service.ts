import * as tf from '@tensorflow/tfjs';
import { TensorLike2D } from '@tensorflow/tfjs-core/dist/types';

export class TensorflowService {
  private static modelPath = '../models/linear_regression_model.pkl';

  private static modelPromise = this.loadModel();

  private static async loadModel() {
    const model = await tf.loadLayersModel(
      //   `file://${this.modelPath}/model.json`
      `file:///C:/Users/nikla/Documents/Uni/Semester_6/individual_study/webserver/packages/server/src/models/linear_regression_model.pkl`
    );
    return model;
  }

  public static async predict(inputData: TensorLike2D) {
    const model = await TensorflowService.modelPromise;

    // Convert inputData to a TensorFlow tensor
    const inputTensor = tf.tensor2d(inputData, [1, inputData.length]);

    // Execute the model prediction
    const outputTensor = model.predict(inputTensor);
    // Convert the outputTensor to a JavaScript array

    // const outputData = Array.from(outputTensor.dataSync());

    // Clean up
    inputTensor.dispose();
    // outputTensor.dispose();
    console.log(outputTensor);

    return null;
  }
}
