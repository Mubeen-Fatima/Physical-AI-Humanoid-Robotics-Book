# Chapter Template Guide

This guide helps content authors write consistent, high-quality chapters for the Physical AI & Humanoid Robotics Textbook.

## File Naming and Location

```
apps/learn-app/docs/
├── preface.mdx
├── 01-foundations/
│   ├── chapter-01.mdx
│   ├── chapter-02.mdx
│   ├── chapter-03.mdx
│   └── chapter-04.mdx
├── 02-ros2/
│   ├── chapter-05.mdx
│   └── ... (chapters 6-9)
└── ... (other parts)
```

**Naming Convention**: `chapter-XX.mdx` where XX is the chapter number (01, 02, etc.)

---

## Chapter Structure Template

Copy this template for new chapters:

```mdx
---
sidebar_position: 1
title: "Chapter Title Goes Here"
description: "Brief 1-2 sentence description for SEO and previews"
---

# Chapter Title Goes Here

**Learning Objectives**

By the end of this chapter, you will be able to:

- Objective 1 (use action verbs: understand, implement, analyze, etc.)
- Objective 2
- Objective 3
- Objective 4 (typically 3-5 objectives)

**Prerequisites**

- Prerequisite knowledge 1
- Prerequisite knowledge 2
- Prior chapter references if applicable

---

## Overview

Brief introduction (2-3 paragraphs) explaining:
- What this chapter covers
- Why this topic is important for Physical AI
- How it connects to previous and future chapters

---

## Core Concepts

### Concept 1: Descriptive Heading

Explain the first major concept with:
- Clear definitions
- Real-world examples
- Diagrams or illustrations (when helpful)

**Key Points:**
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Concept 2: Another Important Topic

Continue with additional concepts...

---

## Hands-On Tutorial

### Step 1: Setup

Provide step-by-step instructions for setting up the environment.

```bash
# Installation commands
sudo apt update
sudo apt install ros-humble-example-package
```

### Step 2: Implementation

Walk through the implementation with code examples.

```python
# Example Python code for ROS 2
import rclpy
from rclpy.node import Node

class MyNode(Node):
    def __init__(self):
        super().__init__('my_node')
        self.get_logger().info('Node started!')

def main():
    rclpy.init()
    node = MyNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

**Explanation:**
- Line-by-line breakdown of important code
- Explain design decisions
- Highlight common pitfalls

### Step 3: Testing and Validation

Show how to test the implementation:

```bash
# Run the node
ros2 run my_package my_node

# Expected output:
# [INFO] [my_node]: Node started!
```

---

## Best Practices

- Best practice 1: Explanation
- Best practice 2: Explanation
- Best practice 3: Explanation

---

## Common Pitfalls

**Problem 1: Descriptive Error**
- **Symptom**: What the user sees
- **Cause**: Why it happens
- **Solution**: How to fix it

**Problem 2: Another Common Issue**
- **Symptom**: Error message or behavior
- **Cause**: Root cause explanation
- **Solution**: Step-by-step fix

---

## Summary

**Key Takeaways:**
- Main point 1
- Main point 2
- Main point 3

**In the Next Chapter:**
Brief preview of what's coming next (1-2 sentences).

---

## Exercises

### Exercise 1: Basic Practice

**Task**: Description of what to implement

**Requirements**:
- Requirement 1
- Requirement 2
- Requirement 3

**Hints**:
- Helpful hint 1
- Helpful hint 2

### Exercise 2: Intermediate Challenge

**Task**: More complex implementation task

**Requirements**:
- Detailed requirements
- Expected behavior
- Performance criteria

### Exercise 3: Advanced Project

**Task**: Open-ended project description

**Guidelines**:
- Project scope
- Suggested approach
- Evaluation criteria

---

## Additional Resources

- [Official ROS 2 Documentation](https://docs.ros.org)
- [Research Paper Title](https://example.com/paper.pdf)
- [Video Tutorial Series](https://example.com/video)
- GitHub repositories with reference implementations

---

## Glossary

**Term 1**: Definition with context-specific explanation

**Term 2**: Another important term defined

**Term 3**: Technical jargon explained in accessible language
```

---

## Content Guidelines

### Writing Style

- **Tone**: Professional but approachable
- **Person**: Use "you" for instructions, "we" for collaborative exploration
- **Length**: 1,500-2,500 words per chapter (excluding code)
- **Readability**: Aim for 8th-10th grade reading level

### Code Examples

**Requirements**:
- All code must be tested and working
- Use syntax highlighting with language tags (```python, ```bash, etc.)
- Include comments explaining non-obvious logic
- Follow language-specific style guides (PEP 8 for Python)

**Code Block Format**:
```python
# Good: Clear, commented, complete example
import rclpy
from geometry_msgs.msg import Twist

# Create velocity command
cmd_vel = Twist()
cmd_vel.linear.x = 0.5  # Move forward at 0.5 m/s
cmd_vel.angular.z = 0.0  # No rotation
```

**Avoid**:
- Incomplete code snippets without context
- Overly complex examples for simple concepts
- Code without error handling where appropriate

### Diagrams and Images

- Use SVG format for diagrams (vector graphics)
- Store in `apps/learn-app/static/img/chapters/XX/`
- Reference with relative paths: `![Diagram](../../static/img/chapters/01/sensor-fusion.svg)`
- Include alt text for accessibility

### Cross-References

Link to other chapters:
```mdx
See [Chapter 3: Robot Kinematics](../01-foundations/chapter-03.mdx) for coordinate frame details.
```

Link to sections within chapter:
```mdx
As discussed in [Core Concepts](#core-concepts), sensor fusion is critical.
```

### Mathematical Notation

Use LaTeX for equations (Docusaurus supports KaTeX):

```mdx
Inline equation: $E = mc^2$

Block equation:
$$
\mathbf{x}_{t} = \mathbf{A}\mathbf{x}_{t-1} + \mathbf{B}\mathbf{u}_t + \mathbf{w}_t
$$
```

---

## Quality Checklist

Before submitting a chapter, verify:

### Content
- [ ] All learning objectives are addressed in the chapter
- [ ] Hands-on tutorial is complete and tested
- [ ] Code examples run without errors
- [ ] Exercises are achievable with chapter content
- [ ] Technical accuracy verified (peer review recommended)

### Structure
- [ ] Follows template structure
- [ ] Clear heading hierarchy (H1 → H2 → H3, no skips)
- [ ] Front matter (YAML) is complete and correct
- [ ] Logical flow from overview → concepts → tutorial → exercises

### Style
- [ ] Consistent terminology throughout
- [ ] Active voice preferred over passive
- [ ] Jargon explained on first use
- [ ] Acronyms defined (e.g., ROS 2: Robot Operating System 2)
- [ ] No spelling or grammar errors

### Technical
- [ ] All code is syntax-highlighted
- [ ] All links work (internal and external)
- [ ] Images load correctly
- [ ] File is valid MDX (run `npm run build` to check)

### Accessibility
- [ ] Alt text on all images
- [ ] Clear link text (avoid "click here")
- [ ] Sufficient color contrast in diagrams
- [ ] Code examples have descriptive comments

---

## Example Chapter Excerpt

Here's a well-structured excerpt from Chapter 1:

```mdx
---
sidebar_position: 1
title: "Chapter 1: Introduction to Physical AI"
description: "Understand the paradigm shift from digital AI to embodied physical AI systems"
---

# Chapter 1: Introduction to Physical AI

**Learning Objectives**

By the end of this chapter, you will be able to:

- Distinguish between digital AI and physical AI systems
- Identify the core components of a physical AI robot
- Explain the sensor-action loop in embodied agents
- Set up a basic ROS 2 workspace for Physical AI development

**Prerequisites**

- Basic Python programming (variables, functions, classes)
- Familiarity with command-line interfaces (Linux/macOS terminal)
- Understanding of basic AI concepts (machine learning, neural networks)

---

## Overview

Physical AI represents a fundamental shift from traditional digital AI systems that operate purely in software to **embodied agents** that interact with the physical world through sensors and actuators. While digital AI excels at tasks like image classification or language translation, physical AI tackles challenges like robot navigation, manipulation, and human-robot interaction.

This chapter introduces the core concepts of physical AI, explores the unique challenges of embodied intelligence, and guides you through setting up your first ROS 2 environment—the foundation for all subsequent chapters.

By bridging the gap between software intelligence and physical hardware, you'll gain the skills to build robots that perceive, reason, and act in real-world environments.

---

## Core Concepts

### What is Physical AI?

**Physical AI** (also called **Embodied AI**) refers to artificial intelligence systems that:
1. Perceive the physical world through sensors (cameras, LiDAR, IMUs)
2. Make decisions based on sensory input and task objectives
3. Execute actions in the real world via actuators (motors, grippers)

**Key Difference from Digital AI:**

| Aspect | Digital AI | Physical AI |
|--------|-----------|-------------|
| Environment | Software-only (images, text) | Physical world (3D space) |
| Feedback Loop | Instantaneous | Real-time with latency |
| Uncertainty | Data noise | Sensor noise + dynamics |
| Failure Mode | Wrong prediction | Physical damage possible |

### The Sense-Think-Act Loop

All physical AI systems follow this fundamental cycle:

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│ SENSE   │─────>│ THINK   │─────>│  ACT    │
│ (Sensors)│      │(Planning)│     │(Actuators)│
└─────────┘      └─────────┘      └─────────┘
     ▲                                    │
     └────────────────────────────────────┘
            (World State Changes)
```

**Example**: A warehouse robot picking up a box

1. **Sense**: Camera detects box location, LiDAR measures distance
2. **Think**: Path planner computes collision-free trajectory to box
3. **Act**: Robot arm moves to box, gripper closes
4. **Feedback**: Force sensors confirm grasp success → update world model

---

## Hands-On Tutorial

### Step 1: Install ROS 2 Humble

ROS 2 (Robot Operating System 2) is the industry-standard framework for building physical AI systems.

```bash
# Ubuntu 22.04 installation
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Add ROS 2 repository
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
  -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] \
  http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" \
  | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Humble
sudo apt update
sudo apt install ros-humble-desktop
```

**Explanation:**
- Line 2-5: Set UTF-8 locale (required for ROS 2)
- Line 8-13: Add official ROS 2 package repository
- Line 16-17: Install full desktop distribution (includes RViz, simulation tools)

### Step 2: Create Your First Workspace

```bash
# Source ROS 2 environment
source /opt/ros/humble/setup.bash

# Create workspace
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# Create a simple package
ros2 pkg create --build-type ament_python my_first_robot \
  --dependencies rclpy std_msgs

# Build the workspace
cd ~/ros2_ws
colcon build

# Source the workspace
source install/setup.bash
```

**Verification:**
```bash
# List packages
ros2 pkg list | grep my_first_robot
# Expected output: my_first_robot
```

---

## Best Practices

- **Always source your workspace**: Add `source ~/ros2_ws/install/setup.bash` to `~/.bashrc`
- **Use version control**: Initialize Git in `~/ros2_ws/src` to track changes
- **Test incrementally**: Build and test after each significant change
- **Follow ROS 2 naming conventions**: Use `snake_case` for packages and nodes

---

## Summary

**Key Takeaways:**
- Physical AI extends digital AI to embodied systems interacting with the real world
- The sense-think-act loop is the foundation of all robot behaviors
- ROS 2 provides the infrastructure for building scalable physical AI systems
- Setting up a proper development environment is critical for success

**In the Next Chapter:**
We'll dive deeper into ROS 2 architecture, exploring nodes, topics, and services—the building blocks of distributed robot systems.

---

## Exercises

### Exercise 1: Environment Verification

**Task**: Verify your ROS 2 installation is working correctly

**Steps**:
1. Run the turtlesim demo: `ros2 run turtlesim turtlesim_node`
2. In another terminal, control the turtle: `ros2 run turtlesim turtle_teleop_key`
3. Use arrow keys to move the turtle

**Expected Result**: Turtle moves in response to keyboard input

### Exercise 2: Create a Simple Publisher

**Task**: Modify `my_first_robot` to publish "Hello, Physical AI!" messages

**Requirements**:
- Create a node that publishes to `/robot_status` topic
- Message type: `std_msgs/String`
- Publish rate: 1 Hz (once per second)

**Hint**: Use `rclpy.create_publisher()` and `create_timer()` methods

### Exercise 3: Research Project

**Task**: Compare ROS 1 vs ROS 2 for Physical AI applications

**Guidelines**:
- Write a 500-word report
- Compare: communication architecture, real-time capabilities, security
- Cite official documentation
- Conclude with which version you'd choose for a warehouse robot and why

---

## Additional Resources

- [ROS 2 Humble Documentation](https://docs.ros.org/en/humble/)
- [Physical AI Research at Stanford](https://ai.stanford.edu/research/physical-ai/)
- [Video: Introduction to Embodied AI](https://www.youtube.com/watch?v=example)
```

---

## Tips for Authors

### Do's
✅ Start with real-world motivation (why does this matter?)
✅ Build complexity gradually (simple → intermediate → advanced)
✅ Include runnable code that readers can copy-paste
✅ Explain "why" not just "how"
✅ Use consistent terminology throughout the book
✅ Link related concepts across chapters

### Don'ts
❌ Assume prior knowledge without stating prerequisites
❌ Use outdated library versions or deprecated APIs
❌ Leave code unexplained (add comments!)
❌ Create exercises without providing hints
❌ Skip error handling in production examples
❌ Use vendor-specific hardware without alternatives

---

## Getting Help

- **Technical Questions**: Open an issue in the GitHub repository
- **Content Review**: Request peer review from subject matter experts
- **Style Questions**: Refer to the [constitution](.specify/memory/constitution.md)
- **Build Errors**: Check Docusaurus build logs with `npm run build`

---

## Version Control

When submitting chapters:

```bash
# Create feature branch
git checkout -b content/chapter-XX

# Add your chapter
git add apps/learn-app/docs/XX-section/chapter-XX.mdx
git add apps/learn-app/static/img/chapters/XX/

# Commit with descriptive message
git commit -m "Add Chapter XX: [Title]

- Learning objectives: [brief list]
- Hands-on tutorial: [what it builds]
- Exercises: [number] exercises covering [topics]"

# Push and create PR
git push origin content/chapter-XX
```

---

## Contact

For questions about chapter authorship:
- Email: [info@panaversity.org](mailto:info@panaversity.org)
- GitHub Issues: [Repository Issues](https://github.com/Mubeen-Fatima/Physical-AI-Humanoid-Robotics-Book/issues)

---

**Happy Writing! 📚🤖**
