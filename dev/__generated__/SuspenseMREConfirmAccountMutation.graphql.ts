/**
 * @generated SignedSource<<0932143ce6a94458590b32708f0f911b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type ConfirmStackOneAccountInput = {
  provider: string;
  stackoneAccountId: string;
};
export type SuspenseMREConfirmAccountMutation$variables = {
  input: ConfirmStackOneAccountInput;
};
export type SuspenseMREConfirmAccountMutation$data = {
  readonly confirmStackOneAccount: {
    readonly errors: ReadonlyArray<string> | null | undefined;
    readonly stackOneAccount: {
      readonly id: string;
      readonly provider: string;
      readonly stackOneAccountId: string;
      readonly status: string;
    } | null | undefined;
  } | null | undefined;
};
export type SuspenseMREConfirmAccountMutation = {
  response: SuspenseMREConfirmAccountMutation$data;
  variables: SuspenseMREConfirmAccountMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ConfirmStackOneAccountPayload",
    "kind": "LinkedField",
    "name": "confirmStackOneAccount",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "StackOneAccount",
        "kind": "LinkedField",
        "name": "stackOneAccount",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stackOneAccountId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provider",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "errors",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SuspenseMREConfirmAccountMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SuspenseMREConfirmAccountMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c83c2a51e6de9a59dce29a531c901861",
    "id": null,
    "metadata": {},
    "name": "SuspenseMREConfirmAccountMutation",
    "operationKind": "mutation",
    "text": "mutation SuspenseMREConfirmAccountMutation(\n  $input: ConfirmStackOneAccountInput!\n) {\n  confirmStackOneAccount(input: $input) {\n    stackOneAccount {\n      id\n      stackOneAccountId\n      provider\n      status\n    }\n    errors\n  }\n}\n"
  }
};
})();

(node as any).hash = "db71117a65917f1d4b3a433c39c15e61";

export default node;
