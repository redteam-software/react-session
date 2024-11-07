### Virtual DOM

#### Reconciliation steps

<div class="flex gap-8 h-full">
  <span class="fragment" data-fragment-index="0"></span>
  <span class="fragment" data-fragment-index="1"></span>
  <span class="fragment" data-fragment-index="2"></span>
  <span class="fragment" data-fragment-index="3"></span>
  <div data-animate data-load="dist/dom.svg" class="flex-1 w-1/2 h-full">
  <!--
    {
      "setup": [
        {
          "element": "#changed-1",
          "modifier": "opacity",
          "parameters": [0]
        },
        {
          "element": "#changed-2",
          "modifier": "opacity",
          "parameters": [0]
        },
        {
          "element": "#changed-3",
          "modifier": "opacity",
          "parameters": [0]
        },
        {
          "element": "#changed-4",
          "modifier": "opacity",
          "parameters": [0]
        },
        {
          "element": "#comparison-1",
          "modifier": "opacity",
          "parameters": [0]
        },
        {
          "element": "#comparison-2",
          "modifier": "opacity",
          "parameters": [0]
        }
      ],
      "animation": [
        [],
        [
          {
            "element": "#changed-1",
            "modifier": "opacity",
            "parameters": [1],
            "duration": 4000
          },
          {
            "element": "#changed-2",
            "modifier": "opacity",
            "parameters": [1]
          }
        ],
        [
          {
            "element": "#comparison-1",
            "modifier": "opacity",
            "parameters": [1]
          },
          {
            "element": "#comparison-2",
            "modifier": "opacity",
            "parameters": [1]
          }
        ],
        [
          {
            "element": "#comparison-1",
            "modifier": "opacity",
            "parameters": [0]
          },
          {
            "element": "#comparison-2",
            "modifier": "opacity",
            "parameters": [0],
            "duration": 500
          },
          {
            "element": "#changed-3",
            "modifier": "opacity",
            "parameters": [1]
          },
          {
            "element": "#changed-4",
            "modifier": "opacity",
            "parameters": [1]
          }
        ],
        []
      ]
    }
    -->
  </div>

  <ol class="flex-1 w-1/2">
    <li class="fragment" data-fragment-index="0">
      Component state changes
    </li>
    <li class="fragment" data-fragment-index="1">
      React updates the Virtual DOM (VDOM)
    </li>
    <li class="fragment" data-fragment-index="2">
      React compares VDOM to DOM
    </li>
    <li class="fragment" data-fragment-index="3">
     If difference, React applies only necessary changes
    </li>
  </ol>
</div>