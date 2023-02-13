/**
 * Forklift API
 * Migration toolkit for virtualization (Forklift) API definitions.
 *
 * The version of the OpenAPI document: 2.4.0
 * Contact Email: kubev2v-dev@redhat.com
 * License: Apache-2.0
 *
 * NOTE: This file is auto generated by crdtotypes (https://github.com/yaacov/crdtoapi/).
 * https://github.com/yaacov/crdtoapi/README.crdtotypes
 */

/**
 * Progress.
 *
 * @export
 */
export interface V1beta1MigrationStatusVmsPipelineProgress {
  /** completed
   * Completed units.
   *
   * @required {true}
   * @format {int64}
   * @originalType {integer}
   */
  completed: number;
  /** total
   * Total units.
   *
   * @required {true}
   * @format {int64}
   * @originalType {integer}
   */
  total: number;
}
