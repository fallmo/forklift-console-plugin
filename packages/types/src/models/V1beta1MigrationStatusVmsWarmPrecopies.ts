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
 * Precopy durations
 *
 * @export
 */
export interface V1beta1MigrationStatusVmsWarmPrecopies {
  /** end
   *
   * @required {false}
   * @format {date-time}
   */
  end?: string;
  /** snapshot
   *
   * @required {false}
   */
  snapshot?: string;
  /** start
   *
   * @required {false}
   * @format {date-time}
   */
  start?: string;
}
