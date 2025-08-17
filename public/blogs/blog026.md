## reactpy

- [reactpy](https://reactpy.dev/docs/index.html)
- [reactpy](https://github.com/reactive-python/reactpy)

## gradio

- [gradio](https://www.gradio.app/)
- [gradio](https://github.com/gradio-app/gradio)

### 自定义

- [html](https://www.gradio.app/docs/gradio/html)
- [markdown](https://www.gradio.app/docs/gradio/markdown)
- [Wrapping Layouts](https://www.gradio.app/guides/wrapping-layouts)
- [Custom Components in 5 minutes](https://www.gradio.app/guides/custom-components-in-five-minutes)
- [Theming](https://www.gradio.app/guides/theming-guide)
- [Customizing your demo with CSS and Javascript](https://www.gradio.app/guides/custom-CSS-and-JS)

### dark mode

- [Is there a way to force the dark mode theme in Gradio?](https://github.com/gradio-app/gradio/issues/7384)
- [[documentation] Toogle &#34;dark&#34; mode - Solved](https://github.com/gradio-app/gradio/issues/8598)
- switch to dark mode by url： `http://127.0.0.1:7860/?__theme=dark`
- switch to dark mode by js：

```python
import gradio as gr

js = """
() => {
    document.body.classList.toggle('dark');
}
"""

with gr.Blocks() as demo:
    btn = gr.Button()
    btn.click(None, [], [], js=js)
    demo.launch()
```

## streamlit

- [streamlit](https://streamlit.io/)
- [streamlit](https://github.com/streamlit/streamlit)

## chainlit

- [chainlit](https://docs.chainlit.io/get-started/overview)
- [chainlit](https://github.com/Chainlit/chainlit)

## dash

- [dash](https://dash.plotly.com/)
- [dash](https://github.com/plotly/dash)

## panel

- [panel](https://panel.holoviz.org/)
- [panel](https://github.com/holoviz/panel)