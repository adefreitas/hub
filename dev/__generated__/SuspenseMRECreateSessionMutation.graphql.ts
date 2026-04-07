/**
 * @generated SignedSource<<93e3284eee70f562d59855388cfab4a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateStackOneConnectSessionInput = {
  integrationId?: string | null | undefined;
  provider: string;
  providerVersion?: string | null | undefined;
};
export type SuspenseMRECreateSessionMutation$variables = {
  input: CreateStackOneConnectSessionInput;
};
export type SuspenseMRECreateSessionMutation$data = {
  readonly createStackOneConnectSession: {
    readonly errors: ReadonlyArray<string> | null | undefined;
    readonly token: string | null | undefined;
  } | null | undefined;
};
export type SuspenseMRECreateSessionMutation = {
  response: SuspenseMRECreateSessionMutation$data;
  variables: SuspenseMRECreateSessionMutation$variables;
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
    "concreteType": "CreateStackOneConnectSessionPayload",
    "kind": "LinkedField",
    "name": "createStackOneConnectSession",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
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
    "name": "SuspenseMRECreateSessionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SuspenseMRECreateSessionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1243b8b59276df9f9806acd060cf2157",
    "id": null,
    "metadata": {},
    "name": "SuspenseMRECreateSessionMutation",
    "operationKind": "mutation",
    "text": "mutation SuspenseMRECreateSessionMutation(\n  $input: CreateStackOneConnectSessionInput!\n) {\n  createStackOneConnectSession(input: $input) {\n    token\n    errors\n  }\n}\n"
  }
};
})();

(node as any).hash = "97ac4e267b6f89cfa200380c84358179";

export default node;
